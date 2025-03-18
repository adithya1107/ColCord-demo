-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('CORE', 'ELECTIVE');

-- CreateEnum
CREATE TYPE "AssessmentType" AS ENUM ('MIDTERM', 'FINAL', 'ASSIGNMENT', 'QUIZ');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE');

-- CreateEnum
CREATE TYPE "GraduationStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'DROPPED_OUT');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'COMPLETED', 'OVERDUE');

-- CreateTable
CREATE TABLE "Student" (
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT,
    "nationality" TEXT,
    "address" TEXT,
    "emergencyContact" TEXT,
    "clerkId" TEXT NOT NULL,
    "photo" TEXT,
    "department" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "gpa" DOUBLE PRECISION,
    "cgpa" DOUBLE PRECISION,
    "sectionId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "Professor" (
    "professorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "clerkId" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("professorId")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "facultyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "department" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("facultyId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Branch" (
    "branchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branchId")
);

-- CreateTable
CREATE TABLE "Section" (
    "sectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("sectionId")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "type" "CourseType" NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "CourseSection" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "professorId" TEXT,
    "classroom" TEXT,
    "timetableId" TEXT,

    CONSTRAINT "CourseSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "qrData" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "location" JSONB NOT NULL,
    "otp" TEXT,
    "faceVerified" BOOLEAN NOT NULL,
    "networkIp" TEXT,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timetable" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "classroom" TEXT,
    "professorId" TEXT,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "assessmentType" "AssessmentType" NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "maxScore" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DegreeProgress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "totalCredits" INTEGER NOT NULL,
    "requiredCredits" INTEGER NOT NULL,
    "electiveCredits" INTEGER NOT NULL,
    "status" "GraduationStatus" NOT NULL,

    CONSTRAINT "DegreeProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "clubId" TEXT NOT NULL,
    "clubName" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("clubId")
);

-- CreateTable
CREATE TABLE "StudentClub" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "StudentClub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubTask" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,

    CONSTRAINT "ClubTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "loginTime" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,

    CONSTRAINT "SecurityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_clerkId_key" ON "Student"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_clerkId_key" ON "Professor"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_clerkId_key" ON "Admin"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_key" ON "Branch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DegreeProgress_studentId_key" ON "DegreeProgress"("studentId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("sectionId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("sectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("professorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("sectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("professorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DegreeProgress" ADD CONSTRAINT "DegreeProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClub" ADD CONSTRAINT "StudentClub_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClub" ADD CONSTRAINT "StudentClub_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubTask" ADD CONSTRAINT "ClubTask_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;
