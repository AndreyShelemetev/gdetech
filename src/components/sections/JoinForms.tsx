import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JoinFormsTabs } from "@/components/forms/JoinFormsTabs";

export function JoinForms() {
  return (
    <section id="join" className="scroll-mt-28 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Начать"
          title="Подать заявку или записаться на встречу"
          description="Выберите формат — вступить в хаб целиком или сначала обсудить конкретный вопрос с нужным экспертом."
          align="center"
        />

        <div className="mt-12">
          <Suspense fallback={null}>
            <JoinFormsTabs />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
