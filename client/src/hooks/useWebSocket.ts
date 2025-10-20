import { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/authStore'

export const useWebSocket = () => {
  const { user, isAuthenticated } = useAuthStore()
  const wsRef = useRef<WebSocket | null>(null)
  const heartbeatRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !user) return

    // Connect to WebSocket
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//${window.location.host}/ws/${user.id}`
    
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
      
      // Start heartbeat
      heartbeatRef.current = window.setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'heartbeat', timestamp: Date.now() }))
        }
      }, 30000) // Every 30 seconds
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        switch (data.type) {
          case 'new_deal':
            // Show notification for new deal
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('New Deal Request', {
                body: `${data.buyer} wants to buy ${data.product}`,
              })
            }
            break
          
          case 'deal_update':
            // Show notification for deal update
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Deal Updated', {
                body: `Deal #${data.deal_id} status: ${data.status}`,
              })
            }
            break
          
          case 'new_message':
            // Show notification for new message
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('New Message', {
                body: 'You have a new message in your deal chat',
              })
            }
            break
          
          case 'user_status':
            // Handle user online/offline status
            console.log(`User ${data.user_id} is ${data.is_online ? 'online' : 'offline'}`)
            break
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current)
      }
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    // Cleanup
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [isAuthenticated, user])

  return wsRef.current
}
