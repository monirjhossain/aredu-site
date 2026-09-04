<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div class="relative site-container py-12 sm:py-14 lg:py-16">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-user-circle text-[14px]"></i>
            Student account
          </div>
          <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
            Login to your AR Education account.
          </h1>
          <p class="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            Access your profile, saved universities, comparison list and upcoming application support in one place.
          </p>
        </div>
      </div>
    </section>

    <section class="site-container py-10 sm:py-12 lg:py-14">
      <div class="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div class="rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Why login?</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold sm:text-3xl">Keep your China plan organised.</h2>
          <div class="mt-6 space-y-3">
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">Save universities and scholarships</div>
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">Track application support steps</div>
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">Manage profile and contact details</div>
          </div>
        </div>

        <div class="rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
          <div class="flex flex-col gap-2 border-b border-ink/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Login</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">Welcome back</h2>
            </div>
            <div class="rounded-full bg-[#F7F8FA] px-4 py-2 text-[12px] font-medium text-ink/50 ring-1 ring-ink/6">
              Demo page
            </div>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent>
            <label class="block">
              <span class="mb-2 block text-[12px] font-semibold text-ink/55">Email address</span>
              <input
                type="email"
                placeholder="info@areducation.net"
                class="w-full rounded-2xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[14px] text-ink outline-none transition focus:border-jade focus:bg-white"
              />
            </label>
            <label class="block">
              <span class="mb-2 block text-[12px] font-semibold text-ink/55">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                class="w-full rounded-2xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[14px] text-ink outline-none transition focus:border-jade focus:bg-white"
              />
            </label>
            <button
              type="submit"
              class="w-full rounded-xl bg-crimson py-3 text-[14px] font-semibold text-white transition hover:brightness-110"
            >
              Login
            </button>
          </form>

          <div class="mt-5 flex flex-col items-start gap-3 text-[12.5px] text-ink/45 sm:flex-row sm:items-center sm:justify-between">
            <a href="#" class="hover:text-ink">Forgot password?</a>
            <RouterLink to="/register" class="font-semibold text-jade hover:underline">Create new account</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
