// // pages/api/posts/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();

//   const title = formData.get('title') as string || null;
//   const content = formData.get('content') as string || null;
//   const image = formData.get('image') as File || null;

//   if (!title || !content || !image) {
//     return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
//   }

//   const buffer = Buffer.from(await image.arrayBuffer());
//   const relativeUploadDir = `/uploads/${new Date().toLocaleDateString('id-ID', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }).replace(/\//g, '-')}`;

//   const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

//   try {
//     await stat(uploadDir);
//   } catch (e: any) {
//     if (e.code === 'ENOENT') {
//       await mkdir(uploadDir, { recursive: true });
//     } else {
//       console.error('Error creating directory for upload', e);
//       return NextResponse.json({ error: 'Server error' }, { status: 500 });
//     }
//   }

//   try {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const filename = `${image.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
//     await writeFile(`${uploadDir}/${filename}`, buffer);
//     const fileUrl = `${relativeUploadDir}/${filename}`;

//     const result = await prisma.article.create({
//       data: {
//         title,
//         content,
//         image: fileUrl,
//       },
//     });

//     return NextResponse.json({ post: result });
//   } catch (e) {
//     console.error('Error while uploading file', e);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }