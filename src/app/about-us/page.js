"use client";

export default function () {
    
    return (
        <div className="container max-w-6xl pt-16 space-y-4">
            <p className="text-3xl md:text-4xl font-bold">About Us</p>
            <p className="text-1.5xl md:text-2xl">Our mission is to make your fitness journey as
                simple as possible. We provide you with a list of
                workouts and methods that will help you achieve your
                fitness goals. You will be able to track your steps,
                calories and the personal records you're bound to achieve.
                We want you to look, feel, and be the person you truly want to be.
                This app will <span className="font-bold">undoubtedly</span> take you there!</p>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                minHeight: "53vh",
            }}>
                <p className="text-3xl md:text-2xl font-bold">Developed By:</p>
                <p className="text-base">Zaki Bonfoh</p>
                <p className="text-base">Olasubomi Lawal</p>
                <p className="text-base">Mathew Mesfin</p>
                <p className="text-base">Joshua Ogunsola</p>
                <p className="text-base">Jephtah Opoku</p>
                <p className="text-base">Simon Yoseph</p><br></br>
                <img style={{ height: 50, textAlign: "center" }} src="/icon.png" alt="MyFit Icon"></img>
            </div>
        </div>
    );
    
}