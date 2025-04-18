'use client'

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const login = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password
            });

            if (error) {
                console.error("Login error:", error.message);
                return;
            }

            console.log("Login successful:", data);
        } catch (e) {
            console.error("Unexpected error:", e);
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-gray-900 text-white rounded-md shadow-md">
            <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
            <div>
                <button
                    onClick={login}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
}