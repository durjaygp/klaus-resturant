import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/durjay')({
  component: Durjay,
})

function Durjay() {
  return (
    <main class="page-wrap px-4 py-12">
      <section class="island-shell rounded-2xl p-6 sm:p-8">
        <p class="island-kicker mb-2">Durjay</p>
        <h1 class="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
         Hello
        </h1>
       
       
      </section>
    </main>
  )
}
