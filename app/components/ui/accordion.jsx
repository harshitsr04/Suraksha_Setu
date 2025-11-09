'use client'

import * as React from 'react'
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { ChevronDown } from 'lucide-react-native'

// Lightweight React Native accordion implementation to replace web-only Radix usage
const AccordionItemContext = React.createContext(null)

function Accordion(props) {
  return <View {...props}>{props.children}</View>
}

function AccordionItem({ children, style, ...props }) {
  const [open, setOpen] = React.useState(false)
  return (
    <AccordionItemContext.Provider value={{ open, setOpen }}>
      <View style={[styles.item, style]} {...props}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({ children, style, iconSize = 20, ...props }) {
  const ctx = React.useContext(AccordionItemContext)
  if (!ctx) return null
  const { open, setOpen } = ctx
  return (
    <TouchableOpacity onPress={() => setOpen(!open)} style={[styles.trigger, style]} {...props}>
      {children}
      <Animated.View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
        <ChevronDown size={iconSize} />
      </Animated.View>
    </TouchableOpacity>
  )
}

function AccordionContent({ children, style, ...props }) {
  const ctx = React.useContext(AccordionItemContext)
  if (!ctx) return null
  const { open } = ctx
  if (!open) return null
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  item: { borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  trigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 8 },
  content: { paddingVertical: 8, paddingHorizontal: 8 },
})

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }