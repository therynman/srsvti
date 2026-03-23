import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, company_name, company_email, responses } = data;

    if (!name || !company_name || !company_email) {
      return NextResponse.json(
        { error: 'Missing core identity fields (name, company, email).' },
        { status: 400 }
      );
    }

    const { data: insertedData, error } = await supabase
      .from('diagnoses')
      .insert([
        {
          name,
          company_name,
          company_email,
          responses,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase Insertion Error:', error);
      return NextResponse.json(
        { error: 'Failed to insert diagnosis data.', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Diagnosis recorded successfully.', data: insertedData },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Internal server error.', details: err.message },
      { status: 500 }
    );
  }
}
