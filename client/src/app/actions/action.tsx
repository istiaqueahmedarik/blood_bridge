/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getMutableAIState, streamUI } from 'ai/rsc';
import { google } from '@ai-sdk/google';
import { ReactNode } from 'react';
import { z } from 'zod';
import { generateId, generateObject, generateText, Output } from 'ai';
import HospitalCard from '@/components/HospitalCard';
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave';
import DonationChart from '@/components/DonationChart';
import { BloodAppointmentCard } from '@/components/BloodAppointmentCard';
import { MapWithMarkers } from '@/components/MapWithMarkers';
import { redirect } from 'next/navigation';

import { revalidatePath } from 'next/cache'
import { get_with_token, post } from './req';
import { cookies } from 'next/headers';
import { check_type } from './general';

const signUpSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        present_address: z.string().min(1, "Address is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Invalid phone number"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        bloodType: z.string().min(1, "Blood Type is required"),
        dob: z.string().min(1, "Date of birth is required"),
        fathersName: z.string().min(1, "Father's name is required"),
        mothersName: z.string().min(1, "Mother's name is required"),
        nid: z.string().min(1, "NID is required"),
        permanentAddress: z.string().min(1, "Address is required"),
        croppedImage: z.string().min(1, "Cropped image is required"),
        nidImage: z.string().min(1, "NID image is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DonorSignUp(prevState: any, formData: FormData) {
    const validatedFields = signUpSchema.safeParse({
        name: formData.get("name"),
        present_address: formData.get("present_address"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        bloodType: formData.get("bloodType"),
        dob: formData.get("dob"),
        fathersName: formData.get("fathersName"),
        mothersName: formData.get("mothersName"),
        nid: formData.get("nid"),
        permanentAddress: formData.get("permanentAddress"),
        croppedImage: formData.get("croppedImage"),
        nidImage: formData.get("nidImage"),
    });
    console.log(validatedFields);
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.issues[0].message,
        };
    }

    const { name, present_address, email, phone, password, bloodType, dob, fathersName, mothersName, nid, permanentAddress, croppedImage, nidImage } = validatedFields.data;

    try {
        const res = await post('donor_signup', {
            name,
            present_address,
            email,
            phone,
            password,
            bloodType,
            dob,
            fathersName,
            mothersName,
            nid,
            permanentAddress,
            croppedImage,
            nidImage
        });
        console.log(res);
        if (res.error) {
            return { error: res.error };
        }

    }
    catch (error) {
        console.error(error);
        return { error: "Sign up failed!" };
    }
    redirect('/login');

}


const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function Login(prevState: any, formData: FormData) {
    const validatedFields = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.issues[0].message,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const res = await post('login', {
            email,
            password,
        });
        console.log(res);
        if (res.status === 'error') {
            return { error: res.message };
        }
        (await cookies()).set('token', res.token);
        (await cookies()).set('type', res.type);


    }
    catch (error) {
        console.error(error);
        return { error: "Login failed!" };
    }
    redirect('/');

}


export interface ServerMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface ClientMessage {
    id: string;
    role: 'user' | 'assistant';
    display: ReactNode;
}

async function getHospital(hospitalName: string) {
    console.log(`Getting details about hospital ${hospitalName}`);
    return {
        name: hospitalName,
        location: 'Dhaka',
        beds: 100,
        doctors: 20,
        image: '/logo.svg',
    }
}

export async function detectObjectsFromBase64(base64ImageUrl: string) {
    const url = 'https://api.landing.ai/v1/tools/agentic-object-detection';
    const formData = new FormData();

    const base64Response = await fetch(base64ImageUrl);
    const arrayBuffer = await base64Response.arrayBuffer();
    formData.append('image', new Blob([arrayBuffer]), 'image.jpg');
    formData.append('prompts', "profile_picture");
    formData.append('model', 'agentic');

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Basic ${process.env.AGENTIC_API_KEY}`,
            },
        });
        const data = await response.json();
        console.log(JSON.stringify(data));

        let bounding_box;
        try {
            bounding_box = data.data[0][0].bounding_box;
        } catch {
            console.log('No bounding box found');
            bounding_box = [16, 108, 126, 215];
        }
        return { bounding_box: JSON.stringify(bounding_box) };
    } catch (error) {
        console.error(error);
    }
    return { bounding_box: JSON.stringify([16, 108, 126, 215]) };
}


export async function OCRImage(image: string, image1: string) {
    const result = await generateText({
        model: google('gemini-2.0-flash-exp', {
            structuredOutputs: true
        }),

        maxSteps: 10,
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: "Is it look like NID, it needs to be bangladeshi NID? If say yes, also OCR the image, extract info in good structured way and you must reply with the 2d bounding box of box_2d_tx, box_2d_ty,box_2d_bx,box_2d_by  , mask and label of the first image, where the profile pictures at" },
                    { type: 'image', image: image },
                    { type: 'image', image: image1 }
                ],
            },
        ],


        experimental_output: Output.object({
            schema: z.object({
                isNID: z.boolean(),
                name: z.string(),
                fatherName: z.string(),
                motherName: z.string(),
                dob: z.string(),
                nid: z.string(),
                address: z.string(),
                blood_type: z.string(),
                box_2d_tx: z.number(),
                box_2d_ty: z.number(),
                box_2d_bx: z.number(),
                box_2d_by: z.number(),
            }),
        }),
    });
    console.log(result);
    return result.experimental_output;
    return {
        isNID: true,
        name: 'Istiaque Ahmed',
        fatherName: 'Md. Shahidul Islam',
        motherName: 'Rojina Begum',
        dob: '1998-01-01',
        nid: '12345678901234567',
        address: 'Dhaka',
        blood_type: 'A+',
        box_2d_tx: 16,
        box_2d_ty: 108,
        box_2d_bx: 126,
        box_2d_by: 215,
    }
}

async function distanceBetweenHospitals(hospital1: string, hospital2: string) {
    console.log(`Calculating distance between ${hospital1} and ${hospital2}`);
    return 10;
}

async function multiStepTool(prompt: string) {
    console.log(`Executing multi-step tool with prompt: ${prompt}`);

    const { text, toolResults } = await generateText({
        model: google('gemini-2.0-flash-exp'),
        system: 'You are a friendly blood and medical helper assistant! you help with anything related to blood and medical or medicine and you do not miss any info, reply everything',
        maxSteps: 10,
        prompt,

        tools: {
            getHospital: {
                description: 'Get details about a hospital',
                parameters: z.object({
                    hospitalName: z.string()
                }),
                execute: async ({ hospitalName }) => {
                    const hospital = await getHospital(hospitalName);
                    return `The hospital ${hospital.name} is located in ${hospital.location} and has ${hospital.beds} beds and ${hospital.doctors} doctors. Here is an image of the hospital: ${hospital.image}`;
                },
            },

            donation_appointment: {
                description: 'for any donation requirement, get my name and email from database',
                parameters: z.object({
                    prompt: z.string(),
                }),
                execute: async ({ prompt }) => {
                    console.log(`Executing donation appointment tool with prompt: ${prompt}`);
                    const donationAppointment = {
                        name: 'Istiaque Ahmed',
                        email: 'istia@gmail.com'
                    };
                    return `My name is ${donationAppointment.name} and my email is ${donationAppointment.email}`;
                },
            },
            distanceBetweenHospitals: {
                description: 'Get distance between two hospitals',
                parameters: z.object({
                    hospital1: z.string(),
                    hospital2: z.string(),
                }),
                execute: async ({ hospital1, hospital2 }) => {
                    const distance = await distanceBetweenHospitals(hospital1, hospital2);
                    return `The distance between ${hospital1} and ${hospital2} is ${distance} km.`;
                },
            },
            getMyDonationDetails: {
                description: 'Get my recent blood donation details',
                parameters: z.object({
                    prompt: z.string(),
                }),
                execute: async ({ prompt }) => {
                    console.log(`Executing getMyDonationDetails tool with prompt: ${prompt}`);
                    const donation = (await get_with_token('donor/auth/donor_history')).data;

                    const str_donation = donation.map((d: any) => `Date - ${d.Date} , Unit - ${d.Unit} in a ${d.Type} at  ${d.Address}`).join('\n');
                    return str_donation;
                },
            },
            get_hospitals_around_me: {
                description: 'hospital around me, Get the list of hospitals with name, longitude, and latitude near me, based on the location of the user no need to ask for location',
                parameters: z.object({
                    'location': z.string().default('Dhaka').describe('The location of the user'),
                }),
                execute: async ({ location }) => {
                    console.log(`Executing get_hospitals_around_me tool with location: ${location}`);
                    const hospitals = [
                        { name: 'United Hospital Limited', longitude: 90.4069, latitude: 23.7969 },
                        { name: 'Kurmitola General Hospital', longitude: 90.4152, latitude: 23.7789 },
                        { name: 'Kingston Hospital', longitude: 90.3794, latitude: 23.8192 },
                        { name: 'Kuwait Bangladesh Friendship Govt. Hospital', longitude: 90.3938, latitude: 23.8584 },
                        { name: 'Fatima General Hospital', longitude: 90.4098, latitude: 23.9042 },
                    ];
                    const str_hospitals = hospitals.map(h => `${h.name} - ${h.longitude} - ${h.latitude}`).join('\n');
                    return str_hospitals;
                },
            },
        },
    });
    console.log({ text, toolResults });

    return {
        text
    };


}




export async function continueConversation(
    input: string,
): Promise<ClientMessage> {
    'use server';

    const history = getMutableAIState();

    const result = await streamUI({
        model: google('gemini-2.0-flash-exp'),
        messages: [...history.get(), { role: 'user', content: input }],
        text: ({ content, done }) => {
            if (done) {
                history.done((messages: ServerMessage[]) => [
                    ...messages,
                    { role: 'assistant', content },
                ]);
            }

            return <div>{content}</div>;
        },
        tools: {
            hospital: {
                description: 'Details about a hospital',
                parameters: z.object({
                    hospitalName: z
                        .string()
                        .describe('The Name of the hospital, example: "Shahid Suhrawardy Medical College"'),
                    prompt: z.string().describe('The full prompt'),
                }),
                generate: async function* ({ hospitalName, prompt }) {
                    const tmp = `Searching database: ${hospitalName}...`;
                    yield <TextShimmerWave className=" mx-auto text-foreground">
                        {tmp}
                    </TextShimmerWave>;
                    const { text } = await multiStepTool(`${prompt}`);
                    // hospital: { name: string, beds: number, doctors: number, image: string }
                    console.log(`Hospital details: ${text}`);
                    const { object: hospital } = await generateObject({
                        model: google('gemini-2.0-flash-exp'),
                        system: 'seprate the given hospital details into name, beds, doctors, and image and other subtext',
                        prompt: ` ${text}`,
                        schema: z.object({
                            name: z.string(),
                            beds: z.number(),
                            doctors: z.number(),
                            image: z.string(),
                            subtext: z.string().describe('Other parts of the text'),
                            OptionalText: z.string().optional().describe('Other Parts that is not related to the schema and a full senetence'),
                        }),
                    });


                    return <div>
                        <HospitalCard hospital={hospital} />
                        <p>
                            {hospital?.subtext}
                        </p>
                        <p>

                            {hospital?.OptionalText}
                        </p>
                    </div>;
                },
            },
            get_hospitals_around_me: {
                'description': 'hospital around me, Get the list of hospitals with name, longitude, and latitude near me, based on the location of the user no need to ask for location',
                'parameters': z.object({
                    'other_prompt': z.string().describe('The prompt that is not related to the location'),
                    'location': z.string().default('Dhaka').describe('The location of the user'),
                }),
                generate: async function* ({ other_prompt, location }) {
                    yield <TextShimmerWave className=" mx-auto text-foreground">
                        Let me find the hospitals for you...
                    </TextShimmerWave>;
                    const { text } = await multiStepTool(`get nearest hospital of ${location}, ${other_prompt}. `);
                    const { object: hospitals } = await generateObject({
                        model: google('gemini-2.0-flash-exp'),
                        system: 'seprate the given hospital details into name, longitude, and latitude',
                        prompt: text,
                        schema: z.object({
                            hospitals: z.array(z.object({
                                name: z.string(),
                                longitude: z.number(),
                                latitude: z.number(),
                            })),
                            subtext: z.string().describe('Other parts of the text'),
                            OptionalText: z.string().optional().describe('Other Parts that is not related to the schema and a full senetence'),
                        }),
                    });

                    return <div>
                        <MapWithMarkers locations={hospitals.hospitals} className='max-w-[80vw]' />
                        <p>
                            {hospitals?.subtext}
                        </p>
                        <p>

                            {hospitals?.OptionalText}
                        </p>
                    </div>;
                }


            },
            donation_chart: {
                description: 'My Recent Blood Donation Chart',
                parameters: z.object({
                    prompt: z.string().describe('The full prompt'),
                }),
                generate: async function* ({ prompt }) {
                    yield <TextShimmerWave className="mx-auto text-foreground">
                        Umm... Let me find that...
                    </TextShimmerWave>;
                    const type = await check_type();
                    if (type !== 'donor')
                        return <div>Are you sure you are logged in as Donor?</div>
                    const { text } = await multiStepTool(`${prompt}`);

                    const { object: donationChart } = await generateObject({
                        model: google('gemini-2.0-flash-exp'),
                        system: 'seprate the given donation chart details into date, amount, and location',
                        prompt: text,
                        schema: z.object({
                            detais: z.array(z.object({
                                Date: z.string(),
                                Unit: z.number(),
                                Address: z.string(),
                                Type: z.string(),
                            })),
                            subtext: z.string().describe('Other parts of the text'),
                            OptionalText: z.string().optional().describe('Other Parts that is not related to the schema and a full senetence'),
                        }),
                    });





                    return <div>    <DonationChart data={donationChart.detais} />
                        <p>
                            {donationChart?.subtext}
                        </p>
                        <p>

                            {donationChart?.OptionalText}
                        </p>
                    </div>;
                },
            },
            donation_appointment: {
                description: 'Blood Donation Appointment Form, if user wants to donate blood',
                parameters: z.object({
                    prompt: z.string().describe('The full prompt'),
                }),
                generate: async function* ({ prompt }) {
                    yield <TextShimmerWave className="mx-auto text-foreground">
                        Umm... Let me think about that...
                    </TextShimmerWave>;
                    const { text } = await multiStepTool(`${prompt}`);

                    const { object: donationAppointment } = await generateObject({
                        model: google('gemini-2.0-flash-exp'),
                        system: 'seprate the given donation appointment details into date, amount, location',
                        prompt: text,
                        schema: z.object({
                            name: z.string(),
                            email: z.string(),
                            subtext: z.string().describe('Other parts of the text'),
                            OptionalText: z.string().optional().describe('Other Parts that is not related to the schema and a full senetence'),
                        }),
                    });

                    return <div>
                        <BloodAppointmentCard />
                        <p>
                            {donationAppointment?.subtext}
                        </p>
                        <p>

                            {donationAppointment?.OptionalText}
                        </p>

                    </div>;
                },
            },

            general: {
                description: 'General Information',
                parameters: z.object({
                    prompt: z.string().describe('The full prompt'),
                }),
                generate: async function* ({ prompt }) {
                    yield <TextShimmerWave className="mx-auto text-foreground">
                        Umm... Let me think about that...
                    </TextShimmerWave>;
                    const { text } = await multiStepTool(`${prompt}`);

                    return <div>{text}</div>;
                },
            }


        },
    });

    return {
        id: generateId(),
        role: 'assistant',
        display: result.value,
    };
}






let offers = [
    { id: 1, hospital: "Central Hospital", service: "Blood Test", discountPercentage: 20, expiryDate: "2023-12-31" },
    { id: 2, hospital: "Central Hospital", service: "X-Ray", discountPercentage: 15, expiryDate: "2023-12-25" },
]

export async function addOffer(formData: FormData) {
    const hospital = formData.get('hospital') as string
    const service = formData.get('service') as string
    const discountPercentage = parseInt(formData.get('discountPercentage') as string)
    const expiryDate = formData.get('expiryDate') as string

    const newOffer = {
        id: offers.length + 1,
        hospital,
        service,
        discountPercentage,
        expiryDate,
    }

    offers.push(newOffer)
    revalidatePath('/offers')
}

export async function updateOffer(formData: FormData) {
    const id = parseInt(formData.get('id') as string)
    const hospital = formData.get('hospital') as string
    const service = formData.get('service') as string
    const discountPercentage = parseInt(formData.get('discountPercentage') as string)
    const expiryDate = formData.get('expiryDate') as string

    offers = offers.map(offer =>
        offer.id === id ? { ...offer, hospital, service, discountPercentage, expiryDate } : offer
    )

    revalidatePath('/offers')
}

export async function deleteOffer(formData: FormData) {
    const id = parseInt(formData.get('id') as string)
    offers = offers.filter(offer => offer.id !== id)
    revalidatePath('/offers')
}

export async function getOffers() {
    return offers
}

