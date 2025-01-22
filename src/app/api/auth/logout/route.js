import { NextResponse } from 'next/server';
import api from '@/utils/api';

export async function DELETE(req) {
    try {
        const result = await api.logout();

        if (!result) {
            throw new Error('Failed to logout.');
        }

        // Buat response dengan JSON
        const response = NextResponse.json({ success: true });

        // Hapus token dari cookies
        response.cookies.set('authToken', '', {
            httpOnly: true, // Menghindari akses dari JavaScript untuk keamanan
            secure: process.env.NODE_ENV === 'production', // Hanya kirim di HTTPS jika production
            path: '/', // Berlaku untuk seluruh aplikasi
            sameSite: 'strict', // Membatasi pengiriman cookies ke origin yang sama
            maxAge: 0, // Hapus cookies
        });

        return response;
    }catch (err) {
        return NextResponse.json({ error: err.message }, { status: 401 });
    }
}