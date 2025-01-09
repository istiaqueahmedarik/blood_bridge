'use server'

import { revalidatePath } from 'next/cache'

export async function submitOffer(formData: FormData) {
  // In a real application, you would save this data to a database
  const offer = {
    hospitalName: formData.get('hospitalName'),
    serviceName: formData.get('serviceName'),
    description: formData.get('description'),
    pointsRequired: formData.get('pointsRequired'),
    expirationDate: formData.get('expirationDate'),
  }

  console.log('Offer submitted:', offer)

  // Simulate a delay to mimic database operation
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Revalidate the offers page to show the new offer immediately
  revalidatePath('/offers')

  return { success: true, message: 'Offer submitted successfully!' }
}

