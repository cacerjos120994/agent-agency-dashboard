"use client";

import { useState, useEffect } from 'react'
import { ocClient, OpenClawSession, ChatEvent } from '../lib/openclaw-ws'
import { Agent, AgentStatus } from '../types'

export function useOpenClaw() {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'offline'>('connecting')
  const [sessions, setSessions] = useState<OpenClawSession[]>([])
  const [recentEvents, setRecentEvents] = useState<ChatEvent[]>([])

  useEffect(() => {
    // Sync connection status
    ocClient.onConnectionChange = (isConnected) => {
      setStatus(isConnected ? 'connected' : 'offline')
      if (isConnected) {
        // Fetch sessions on connect
        ocClient.request('sessions.list', {}).then(res => {
          if (res?.sessions) setSessions(res.sessions)
        }).catch(err => console.error('Failed to list sessions', err))
      }
    }

    // Connect
    ocClient.connect()

    // Subscribe to live events
    const unsubscribe = ocClient.subscribe((event: ChatEvent) => {
      // 1. Keep a rolling window of recent events for logs
      setRecentEvents(prev => [event, ...prev].slice(0, 50))
      
      // 2. If it's a structural event, refresh sessions list
      if (event.type === 'session.started' || event.type === 'session.stopped') {
        ocClient.request('sessions.list', {}).then(res => {
          if (res?.sessions) setSessions(res.sessions)
        }).catch(() => {})
      }
    })

    return () => {
      unsubscribe()
      // We don't disconnect the global client here so it persists across renders,
      // but you could if needed.
    }
  }, [])

  return { status, sessions, recentEvents }
}

/**
 * Helper hook to map real OpenClaw sessions to our visual Agents
 */
export function useLiveAgents(initialAgents: Agent[]) {
  const { status, sessions, recentEvents } = useOpenClaw()
  const [agents, setAgents] = useState<Agent[]>(initialAgents)

  useEffect(() => {
    setAgents(prevAgents => {
      return prevAgents.map(agent => {
        // 1. Find if this agent has a real OpenClaw session running.
        // We match by agent.id === session.agentId or session.label
        const liveSession = sessions.find(s => s.agentId === agent.id || s.label === agent.id)
        
        let newStatus: AgentStatus = 'Offline'
        
        if (status === 'connected') {
           if (!liveSession) {
             newStatus = 'Idle' // Connected to gateway but no active session for this specific agent yet
           } else {
             newStatus = 'Active'
             // If we wanted to get fancy, we could look at recentEvents to see if this session
             // just fired a tool_call. If so, newStatus = 'Researching' | 'Writing' based on role.
             const isWorking = recentEvents.some(e => e.sessionKey === liveSession.sessionKey && (e.type === 'tool_call' || e.type === 'agent_turn'))
             
             if (isWorking) {
                if (agent.department === 'Market Intelligence') newStatus = 'Researching'
                else if (agent.department === 'Messaging & Persuasion') newStatus = 'Writing'
                else if (agent.department === 'Creative Systems') newStatus = 'Designing'
                else if (agent.department === 'Paid Media Planning') newStatus = 'Planning'
                else if (agent.department === 'Performance Intelligence') newStatus = 'Analyzing'
                else newStatus = 'Active'
             } else {
                newStatus = 'Idle'
             }
           }
        } else {
           newStatus = 'Offline'
        }

        // Return updated agent with live status
        return {
          ...agent,
          status: newStatus,
          // Could also map liveSession.lastMessage to agent.currentTask if available
        }
      })
    })
  }, [status, sessions, recentEvents])

  return { agents, connectionStatus: status }
}
