'use server'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function createUsers() {
  const fakeUsers = [
    {
      name: 'Emma Smith',
      email: 'emma.smith@example.com',
      username: 'emma_s',
      password: 'Emma123!',
      bio: 'Avid traveler and photographer, capturing the beauty of the world.'
    },
    {
      name: 'Liam Johnson',
      email: 'liam.johnson@example.com',
      username: 'liam_j',
      password: 'Liam123!',
      bio: 'Tech enthusiast and software developer with a passion for AI.'
    },
    {
      name: 'Olivia Brown',
      email: 'olivia.brown@example.com',
      username: 'olivia_b',
      password: 'Olivia123!',
      bio: 'Culinary artist and food blogger, sharing delicious recipes.'
    },
    {
      name: 'Noah Davis',
      email: 'noah.davis@example.com',
      username: 'noah_d',
      password: 'Noah123!',
      bio: 'Fitness trainer dedicated to helping others achieve their health goals.'
    },
    {
      name: 'Ava Wilson',
      email: 'ava.wilson@example.com',
      username: 'ava_w',
      password: 'Ava123!',
      bio: 'Graphic designer with a love for creating visually stunning art.'
    },
    {
      name: 'William Moore',
      email: 'william.moore@example.com',
      username: 'william_m',
      password: 'William123!',
      bio: 'History buff and writer, exploring the past to inform the future.'
    },
    {
      name: 'Sophia Taylor',
      email: 'sophia.taylor@example.com',
      username: 'sophia_t',
      password: 'Sophia123!',
      bio: 'Fashionista and style guru, inspiring others with her unique looks.'
    },
    {
      name: 'James Anderson',
      email: 'james.anderson@example.com',
      username: 'james_a',
      password: 'James123!',
      bio: 'Musician and composer, creating melodies that move the soul.'
    },
    {
      name: 'Isabella Thomas',
      email: 'isabella.thomas@example.com',
      username: 'isabella_t',
      password: 'Isabella123!',
      bio: 'Environmentalist and nature lover, advocating for a greener planet.'
    },
    {
      name: 'Benjamin Lee',
      email: 'benjamin.lee@example.com',
      username: 'benjamin_l',
      password: 'Benjamin123!',
      bio: 'Entrepreneur and startup mentor, helping businesses grow.'
    },
    {
      name: 'Mia Harris',
      email: 'mia.harris@example.com',
      username: 'mia_h',
      password: 'Mia123!',
      bio: 'Yoga instructor promoting mindfulness and healthy living.'
    },
    {
      name: 'Lucas Martin',
      email: 'lucas.martin@example.com',
      username: 'lucas_m',
      password: 'Lucas123!',
      bio: 'Engineer and innovator, solving problems with technology.'
    },
    {
      name: 'Amelia Martinez',
      email: 'amelia.martinez@example.com',
      username: 'amelia_m',
      password: 'Amelia123!',
      bio: 'Travel blogger documenting her adventures around the globe.'
    },
    {
      name: 'Henry Rodriguez',
      email: 'henry.rodriguez@example.com',
      username: 'henry_r',
      password: 'Henry123!',
      bio: 'Film critic and cinephile, sharing insights on the latest movies.'
    },
    {
      name: 'Harper Lewis',
      email: 'harper.lewis@example.com',
      username: 'harper_l',
      password: 'Harper123!',
      bio: 'Aspiring novelist working on her first book.'
    },
    {
      name: 'Daniel Walker',
      email: 'daniel.walker@example.com',
      username: 'daniel_w',
      password: 'Daniel123!',
      bio: "Professional photographer capturing life's precious moments."
    },
    {
      name: 'Charlotte Young',
      email: 'charlotte.young@example.com',
      username: 'charlotte_y',
      password: 'Charlotte123!',
      bio: 'Educator dedicated to making learning fun and engaging.'
    },
    {
      name: 'Michael King',
      email: 'michael.king@example.com',
      username: 'michael_k',
      password: 'Michael123!',
      bio: 'Sports enthusiast and coach, fostering teamwork and discipline.'
    },
    {
      name: 'Ella Wright',
      email: 'ella.wright@example.com',
      username: 'ella_w',
      password: 'Ella123!',
      bio: 'Digital marketer helping brands tell their stories online.'
    },
    {
      name: 'Alexander Scott',
      email: 'alexander.scott@example.com',
      username: 'alexander_s',
      password: 'Alexander123!',
      bio: 'Architect designing spaces that inspire and innovate.'
    }
  ]

  let users = []
  for (let i = 1; i <= fakeUsers.length; i++) {
    const hashedPassword = await bcrypt.hash(fakeUsers[i].password, 10)
    users.push({
      ...fakeUsers[i],
      password: hashedPassword,
      image: `https://picsum.photos/seed/${i}/300/300`
    })
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true // Optional: skips duplicate entries based on unique constraints
  })

  console.log('Seed users created successfully!')
}

createUsers()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit()
  })
