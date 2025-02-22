import { get } from "@/app/actions/req";
import { BloodRequestForm } from "@/components/blood-request-form";

export default async function Home() {
    const res = await get('bloodbank/bloodbanks');
    console.log(res);
    return (
        <>
            <div className="min-h-screen  flex items-center justify-center p-1">
                <BloodRequestForm res={res} />
            </div>
        </>
    )
}

