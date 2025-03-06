import React from 'react';
import AuthForm from "@/components/AuthForm";
import Container from "@/components/Container";

const Page = () => {
    return <div className={'min-h-[calc(100vh-68px)] flex justify-center items-center'}>
        <Container className={"w-full"}>
            <AuthForm type={'login'} title={"Вход"} className={'max-w-2xl w-full mx-auto'} />
        </Container>
    </div>
};

export default Page;