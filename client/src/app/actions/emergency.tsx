/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { redirect } from "next/navigation"
import { post, post_with_token } from "./req"

export async function sendMail(msg: string) {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            service_id: 'service_nsfwyrb',
            template_id: 'template_dqb6ys4',
            user_id: '-5Yq0qod4i_9g_tOj',
            template_params: {
                distance: msg,
                link: 'https://www.google.com',
                reply_to: 'istiaqueahmedarik@gmail.com'
            }
        })
    })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.error(err)
        })

}

export async function EmergencyReq(prevState: any, formData: FormData) {

    const Name = formData.get('Name')
    const Age = formData.get('Age')
    const Blood_type_req = formData.get('Blood_type_req')
    const Unit_req = formData.get('Unit_req')
    const Hospital_name = formData.get('Hospital_name')
    const Hospital_location = formData.get('Hospital_location')
    const Reason = formData.get('Reason')
    const Contact_name = formData.get('Contact_name')
    const Contact_phone = formData.get('Contact_phone')
    const latitude = formData.get('latitude')
    const longitude = formData.get('longitude')

    const res = await post('emergency/request', {
        Name, Age, Blood_type_req, Unit_req, Hospital_name, Hospital_location, Reason, Contact_name, Contact_phone, latitude, longitude
    })
    if (res && res.user) {
        const dt = res.user.map((user: any) => ({
            ...user,
            "email": user.email,
            "distance": user.distance.toFixed(2),
            "link": process.env.NEXT_PUBLIC_CLIENT + '/emergency/' + res.res[0].ID,
            "id": res.res[0].ID
        }))
        return {
            data: dt,
        }
    }


}


export async function AcceptEm(prevState: any, formData: FormData) {
    const val = formData.get('val')
    const eid = formData.get('eid')

    let path = null
    if (val === 'reject') {
        path = '/'
    }
    await post_with_token('auth/em/ac', {
        eid,
        val
    })
        .catch((err) => {
            console.error(err)
        })
    if (path)
        redirect(path)

}