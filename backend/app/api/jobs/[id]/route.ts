import { NextRequest, NextResponse } from 'next/server';
import pool from "@/app/utils/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, company, companylogo, salary, location, url } = body;

    const result = await pool.query(
      `UPDATE jobs 
       SET title = $1, company = $2, companylogo = $3, salary = $4, location = $5, url = $6
       WHERE id = $7
       RETURNING *`,
      [title, company, companylogo, salary, location, url, params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      'DELETE FROM jobs WHERE id = $1 RETURNING *',
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Job deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}