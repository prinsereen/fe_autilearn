import { NextResponse } from 'next/server';
import api from '@/utils/api';

export async function POST(req) {
    const body = await req.formData();
    const { quiz_id, quiz_item_id, answer, correct_answer } = Object.fromEntries(body);
    console.log(quiz_id, quiz_item_id, answer, correct_answer);

    try {
        const result = await api.createTakeQuiz(quiz_id, quiz_item_id, answer, correct_answer);

        if (!result) {
            throw new Error('Failed to save quiz.');
        }

        // Buat response dengan JSON
        const response = NextResponse.json({ score: true });

        return response;
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 401 });
    }
}