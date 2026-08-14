-- AlterTable
ALTER TABLE "expert_meeting_requests" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "hub_applications" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "expert_meeting_requests_userId_idx" ON "expert_meeting_requests"("userId");

-- CreateIndex
CREATE INDEX "hub_applications_userId_idx" ON "hub_applications"("userId");

-- AddForeignKey
ALTER TABLE "hub_applications" ADD CONSTRAINT "hub_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_meeting_requests" ADD CONSTRAINT "expert_meeting_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
