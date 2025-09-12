'use client'

import { memo, useMemo } from 'react'

import { type Audio } from '@/types/os'
import { decodeBase64Audio } from '@/lib/audio'

/**
 * Renders a single audio item with controls
 * @param audio - Audio object containing url or base64 audio data
 */
const AudioItem = memo(({ audio }: { audio: Audio }) => {
  const audioUrl = useMemo(() => {
    if (audio?.url) {
      return audio.url
    }
    if (audio.base64_audio) {
      return decodeBase64Audio(
        audio.base64_audio,
        audio.mime_type || 'audio/wav'
      )
    }
    if (audio.content) {
      return decodeBase64Audio(
        audio.content,
        'audio/pcm16',
        audio.sample_rate,
        audio.channels
      )
    }
    return null
  }, [audio])

  if (!audioUrl) return null

  return (
    <audio
      src={audioUrl}
      controls
      className="w-full rounded-lg"
      preload="metadata"
    />
  )
})

AudioItem.displayName = 'AudioItem'

/**
 * Renders a list of audio elements
 * @param audio - Array of Audio objects
 */
const Audios = memo(({ audio }: { audio: Audio[] }) => (
  <div className="flex flex-col gap-4">
    {audio.map((audio_item, index) => (
      // TODO :: find a better way to handle the key
      <AudioItem key={audio_item.id ?? `audio-${index}`} audio={audio_item} />
    ))}
  </div>
))

Audios.displayName = 'Audios'

export default Audios
