import { expect, test } from '@playwright/test';

import { pricing } from '../src/config/pricing';
import { en } from '../src/content/en';
import { ptBR } from '../src/content/pt-BR';

// Prazos e percentuais aparecem em prosa no copy; aqui garantimos que batem com pricing.ts.
// Campos ainda em "TODO(Verso)" são ignorados.
const isTodo = (text: string) => text.startsWith('TODO');

for (const copy of [ptBR, en]) {
  test(`copy ${copy.locale} bate com pricing.ts`, () => {
    for (const step of pricing[copy.locale].steps) {
      const stepCopy = copy.ladder.steps[step.id];
      if (!isTodo(stepCopy.payment)) {
        for (const { percent } of step.payment) {
          if (percent < 100 || step.payment.length === 1) {
            expect(stepCopy.payment, `${step.id}: pagamento`).toContain(`${percent}%`);
          }
        }
      }
      if (step.duration && !isTodo(stepCopy.timeline)) {
        expect(stepCopy.timeline, `${step.id}: prazo`).toContain(String(step.duration.min));
        expect(stepCopy.timeline, `${step.id}: prazo`).toContain(String(step.duration.max));
      }
    }
  });
}
