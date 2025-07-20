-- Create enum types for the database
-- Run this script directly in your Supabase SQL editor

-- Create Role enum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER');

-- Create Stage enum  
CREATE TYPE "public"."Stage" AS ENUM ('GROUP', 'KNOCKOUT', 'FINALS');

-- Create Status enum
CREATE TYPE "public"."Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED'); 