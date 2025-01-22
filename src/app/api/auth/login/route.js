import { NextResponse } from 'next/server';
import api from '@/utils/api';

export async function POST(req) {
    const body = await req.formData();
    const { email, password } = Object.fromEntries(body);

    try {
        const result = await api.login(email, password);

        // Buat response dengan JSON
        const response = NextResponse.json({ success: true });

        // Simpan token ke cookies dengan nama 'authToken'
        response.cookies.set('authToken', result.accessToken, {
            httpOnly: true, // Menghindari akses dari JavaScript untuk keamanan
            secure: process.env.NODE_ENV === 'production', // Hanya kirim di HTTPS jika production
            path: '/', // Berlaku untuk seluruh aplikasi
            sameSite: 'strict', // Membatasi pengiriman cookies ke origin yang sama
            maxAge: 60 * 60 * 24 * 7, // Expiry dalam 7 hari
        });

        return response;
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 401 });
    }
}
