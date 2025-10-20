import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Delete existing data
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  // --- Authors ---
  const authorsData = [
    { name: "J.K. Rowling" },
    { name: "George R.R. Martin" },
    { name: "J.R.R. Tolkien" },
    { name: "Agatha Christie" },
    { name: "Stephen King" },
    { name: "Isaac Asimov" },
    { name: "Arthur C. Clarke" },
    { name: "Ernest Hemingway" },
    { name: "F. Scott Fitzgerald" },
    { name: "Mark Twain" },
    { name: "Leo Tolstoy" },
    { name: "Jane Austen" },
    { name: "Charles Dickens" },
    { name: "C.S. Lewis" },
    { name: "H.G. Wells" },
    { name: "Dan Brown" },
    { name: "Suzanne Collins" },
    { name: "Harper Lee" },
    { name: "Michael Crichton" },
    { name: "Khaled Hosseini" },
  ];

  const authors = await prisma.author.createMany({
    data: authorsData,
  });

  // Fetch all authors to get IDs
  const allAuthors = await prisma.author.findMany();

  // --- Books ---
  const booksData = [];

  for (let i = 1; i <= 50; i++) {
    const randomAuthor = allAuthors[Math.floor(Math.random() * allAuthors.length)];
    const randomDate = new Date(
      1980 + Math.floor(Math.random() * 40),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );

    booksData.push({
      title: `Book Title ${i}`,
      authorId: randomAuthor.id,
      publishedDate: randomDate,
    });
  }

  await prisma.book.createMany({
    data: booksData,
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
