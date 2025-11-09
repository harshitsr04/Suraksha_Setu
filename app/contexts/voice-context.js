"use client"

import { createContext, useContext, useState, useMemo } from "react"

const VoiceContext = createContext(undefined)

export function VoiceProvider({ children }) {
  const [isVoiceSetupComplete, setIsVoiceSetupComplete] = useState(false)
  const [voiceSamples, setVoiceSamples] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [currentLoudness, setCurrentLoudness] = useState(0)
  const [triggerDetected, setTriggerDetected] = useState(false)

  const value = useMemo(
    () => ({
      isVoiceSetupComplete,
      voiceSamples,
      isListening,
      currentLoudness,
      triggerDetected,
      setIsVoiceSetupComplete,
      setVoiceSamples,
      setIsListening,
      setCurrentLoudness,
      setTriggerDetected,
    }),
    [isVoiceSetupComplete, voiceSamples, isListening, currentLoudness, triggerDetected],
  )

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
}

export function useVoice() {
  const context = useContext(VoiceContext)
  if (context === undefined) {
    throw new Error("useVoice must be used within VoiceProvider")
  }
  return context
}