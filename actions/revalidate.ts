'use server'

import { updateTag } from 'next/cache'

export default async function revalidate(tag: string) {
  updateTag(tag)
}
