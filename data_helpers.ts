import { Lesson, Subject } from './types';

/**
 * Decide se um item (atividade / simulado / redação) é visível para um
 * aluno de uma determinada turma. Convenção:
 *   - school_classes (array): aluno vê se sua turma estiver na lista
 *   - school_class (string)  : aluno vê se for exatamente sua turma (legado)
 *   - ambos null/vazios       : visível para todas as turmas da série
 */
export function isItemTargetedAtClass(item: { school_class?: string | null; school_classes?: string[] | null }, studentClass: string | null | undefined): boolean {
  if (!studentClass) return true;
  const list = (item as any)?.school_classes;
  if (Array.isArray(list) && list.length > 0) {
    return list.includes(studentClass);
  }
  const single = item?.school_class;
  if (single) return single === studentClass;
  return true;
}

export const createLesson = (id: string, title: string, subject: Subject, theory: string, questions: string[]): Lesson => ({
  id,
  title,
  subject,
  objectives: [`Compreender os fundamentos de ${subject}`, "Analisar processos históricos e espaciais", "Desenvolver consciência crítica"],
  theory,
  methodology: "Estudo de caso, análise de fontes primárias, debates e produção textual.",
  activities: [{
    id: `${id}-act`,
    title: "Atividade de Reflexão",
    description: "Conecte o conhecimento teórico com sua observação da realidade atual.",
    questions
  }],
  reflectionQuestions: ["Como esse conhecimento ajuda a entender o mundo hoje?", "Qual sua opinião sobre o impacto desse tema na sua comunidade?"]
});
