import { NextResponse } from 'next/server';
import api from '@/utils/api';

export async function POST(req) {
    const body = await req.formData();
    const { name, email, password, conf_password } = Object.fromEntries(body);

    try {
        const result = await api.register(name, email, password, conf_password);

        if (!result) {
            throw new Error('Failed to register.');
        }

        // Buat response dengan JSON
        const response = NextResponse.json({ success: true });

        return response;
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 401 });
    }
}
