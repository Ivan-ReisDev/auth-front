"use client"
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ButtonSignOut() {
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Button 
                disabled 
                variant={"destructive"}>
                    <Loader2 className="animate-spin" />
                    Aguarde
                </Button>
            ) : (
                <Button 
                onClick={handleSignOut} 
                variant={"destructive"}>
                    Sair
                </Button>
            )}
        </>
    );
}
