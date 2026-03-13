export type ChatEvent = {
  type: string
  sessionKey: string
  timestamp: string
  payload: any
}

export type OpenClawSession = {
  sessionKey: string
  agentId: string
  label?: string
  status: 'active' | 'idle' | 'stopped'
  createdAt: string
  updatedAt: string
  lastMessage?: string
}

type Subscriber = (event: ChatEvent) => void

class OpenClawClient {
  private ws: WebSocket | null = null
  private url: string
  private reconnectTimer: any = null
  private subscribers: Set<Subscriber> = new Set()
  
  public connected: boolean = false
  public onConnectionChange: (connected: boolean) => void = () => {}

  constructor() {
    // Try to auto-detect hostname or fallback to localhost
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    this.url = `ws://${host}:18789/`;
    console.log(`[OpenClaw] Initializing WS client with target: ${this.url}`);
  }

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
      return;
    }

    try {
      console.log(`[OpenClaw] Attempting connection to ${this.url}...`);
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('[OpenClaw] Connection established successfully.');
        this.connected = true;
        this.onConnectionChange(true);
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
        this.request('sessions.list', {}).catch(() => {});
      };

      this.ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data)
          this.notifySubscribers(data)
        } catch (e) {
          console.error('[OpenClaw] Failed to parse message', e)
        }
      }

      this.ws.onclose = () => {
        console.log('[OpenClaw] Disconnected')
        this.connected = false
        this.onConnectionChange(false)
        this.ws = null
        this.scheduleReconnect()
      }

      this.ws.onerror = (err) => {
        console.error('[OpenClaw] WebSocket error', err)
      }
    } catch (e) {
      this.scheduleReconnect()
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      this.connect()
    }, 3000)
  }

  subscribe(cb: Subscriber) {
    this.subscribers.add(cb)
    return () => this.subscribers.delete(cb)
  }

  private notifySubscribers(event: ChatEvent) {
    this.subscribers.forEach(cb => cb(event))
  }

  request(method: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.connected || !this.ws) {
        return reject(new Error('Not connected to OpenClaw'))
      }

      const reqId = Math.random().toString(36).slice(2)
      
      const handler = (msg: MessageEvent) => {
        try {
          const data = JSON.parse(msg.data)
          if (data.id === reqId) {
            this.ws?.removeEventListener('message', handler)
            if (data.error) reject(data.error)
            else resolve(data.result)
          }
        } catch (e) {}
      }
      
      this.ws.addEventListener('message', handler)
      this.ws.send(JSON.stringify({
        jsonrpc: '2.0',
        id: reqId,
        method,
        params
      }))

      // Timeout for request
      setTimeout(() => {
        this.ws?.removeEventListener('message', handler)
        reject(new Error('Request timeout'))
      }, 10000)
    })
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const ocClient = new OpenClawClient()
