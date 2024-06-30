'use client'
import { useSession, signIn } from "next-auth/react";
import TablaHistorico from "@/app/components/TablaHistorico/TablaHistorico";


const HistorialDietasPage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        signIn();
        return null;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4 text-webColor">Historial de Dietas</h1>
            <TablaHistorico />
        </div>
    );
};

export default HistorialDietasPage;
