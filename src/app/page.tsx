// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Comment = {
  id: string
  content: string
  created_at: string
}

export default function Home() {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    fetchComments()

    const channel = supabase
      .channel('realtime comments')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, (payload) => {
        setComments((prev) => [...prev, payload.new as Comment])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) console.error(error)
    else setComments(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const { error } = await supabase.from('comments').insert({ content: newComment })
    if (error) console.error(error)
    setNewComment('')
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">실시간 댓글</h1>
      
      <form onSubmit={handleSubmit} className="space-x-2 mb-6">
        <input
          className="border px-2 py-1 w-64"
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          등록
        </button>
      </form>

      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="border p-2 rounded">
            {comment.content}
          </li>
        ))}
      </ul>
    </div>
  )
}
