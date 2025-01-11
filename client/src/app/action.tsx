'use server';

import { getMutableAIState, streamUI } from 'ai/rsc';
import { google } from '@ai-sdk/google';
import { ReactNode } from 'react';
import { z } from 'zod';
import { generateId, generateObject, generateText } from 'ai';
import HospitalCard from '@/components/HospitalCard';
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave';
import DonationChart from '@/components/DonationChart';
import { BloodAppointmentCard } from '@/components/BloodAppointmentCard';
import { MapWithMarkers } from '@/components/MapWithMarkers';
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

async function distanceBetweenHospitals(hospital1: string, hospital2: string) {
    console.log(`Calculating distance between ${hospital1} and ${hospital2}`);
    return 10;
}

async function multiStepTool(prompt: string) {
    console.log(`Executing multi-step tool with prompt: ${prompt}`);
    await new Promise(resolve => setTimeout(resolve, 3000));

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
                    const donation = [
                        { date: '2022-01-01', amount: 500, location: 'Dhaka' },
                        { date: '2022-01-15', amount: 300, location: 'Dhaka' },
                        { date: '2022-02-01', amount: 200, location: 'Dhaka' },
                    ];
                    const str_donation = donation.map(d => `On ${d.date}, I donated ${d.amount} ml of blood at ${d.location}`).join('\n');
                    return str_donation;
                },
            },
            get_hospitals_around_me: {
                description: 'hospital around me, Get the list of hospitals with name, longitude, and latitude near me, based on the location of the user no need to ask for location',
                parameters: z.object({
                    'location': z.string().default('Dhaka').describe('The location of the user'),
                }),
                execute: async ({ location }) => {
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
                        <MapWithMarkers locations={hospitals.hospitals} />
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

                    const { text } = await multiStepTool(`${prompt}`);

                    const { object: donationChart } = await generateObject({
                        model: google('gemini-2.0-flash-exp'),
                        system: 'seprate the given donation chart details into date, amount, and location',
                        prompt: text,
                        schema: z.object({
                            detais: z.array(z.object({
                                date: z.string(),
                                amount: z.number(),
                                location: z.string(),
                            })),
                            subtext: z.string().describe('Other parts of the text'),
                            OptionalText: z.string().optional().describe('Other Parts that is not related to the schema and a full senetence'),
                        }),
                    });


                    return <div>            <DonationChart />
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

