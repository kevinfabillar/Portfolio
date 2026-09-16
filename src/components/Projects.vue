<template>
  <div id="projects" class="proj-block block-row">
    <div class="container">
      <div class="block-header">
        <span class="block-label"><i class="pi pi-send"></i> Featured Projects</span>
        <a href="#" class="block-link">View All <i class="pi pi-arrow-right"></i></a>
      </div>

      <div class="grid-3col">
        <article class="card project-card" v-for="p in projects" :key="p.title">
          <div class="project-thumb" v-if="p.video || p.videoFile">
            <video
              v-if="p.videoFile && playing[p.title]"
              :src="p.videoFile"
              controls
              autoplay
              preload="metadata"
              playsinline
            ></video>
            <iframe
              v-else-if="playing[p.title]"
              :src="withAutoplay(p.video)"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
              loading="lazy"
              title="Project demo video"
            ></iframe>
            <button
              v-else
              type="button"
              class="thumb-play"
              @click="playing[p.title] = true"
              :aria-label="'Play ' + p.title + ' demo video'"
            >
              <img v-if="p.image" :src="p.image" :alt="p.title" class="thumb-img" />
              <span v-if="p.image" class="thumb-overlay" aria-hidden="true"></span>
              <i v-if="!p.image" :class="'pi ' + p.thumbIcon" class="thumb-bg-icon"></i>
              <span class="play-btn"><i class="pi pi-play-fill"></i></span>
            </button>
          </div>
          <div class="project-thumb thumb-placeholder" v-else-if="p.image">
            <a v-if="p.link" :href="p.link" target="_blank" rel="noopener" class="thumb-link" :aria-label="'Visit ' + p.title">
              <img :src="p.image" :alt="p.title" class="thumb-img" />
              <span class="thumb-overlay" aria-hidden="true"></span>
              <span class="visit-badge" aria-hidden="true">Visit website <i class="pi pi-external-link"></i></span>
            </a>
            <img v-else :src="p.image" :alt="p.title" class="thumb-img" />
          </div>
          <div class="project-thumb thumb-placeholder" v-else>
            <i :class="'pi ' + p.thumbIcon"></i>
          </div>

          <div class="project-body">
            <div class="project-head">
              <span class="project-tag">{{ p.tag }}</span>
              <a
                v-if="p.repo"
                :href="p.repo"
                target="_blank"
                rel="noopener"
                class="repo-link"
                :aria-label="'View ' + p.title + ' source on GitHub'"
              >
                <i class="pi pi-github"></i>
              </a>
            </div>
            <h3>{{ p.title }}</h3>
            <span class="project-period">{{ p.period }}</span>

            <div class="project-details">
              <p class="project-desc">{{ p.description }}</p>
              <ul class="project-points">
                <li v-for="point in p.points" :key="point">{{ point }}</li>
              </ul>
            </div>
            <button type="button" class="view-btn" @click="activeProject = p">
              View details <i class="pi pi-external-link"></i>
            </button>

            <div class="project-stack">
              <span v-for="s in p.stack" :key="s" class="mini-chip">{{ s }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="activeProject" class="modal-overlay" @click.self="activeProject = null">
        <div class="card modal-card" role="dialog" aria-modal="true" :aria-label="activeProject.title">
          <button type="button" class="modal-close" @click="activeProject = null" aria-label="Close">
            <i class="pi pi-times"></i>
          </button>

          <div class="project-thumb modal-thumb" v-if="activeProject.video || activeProject.videoFile">
            <video
              v-if="activeProject.videoFile && playing[activeProject.title]"
              :src="activeProject.videoFile"
              controls
              autoplay
              preload="metadata"
              playsinline
            ></video>
            <iframe
              v-else-if="playing[activeProject.title]"
              :src="withAutoplay(activeProject.video)"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
              loading="lazy"
              title="Project demo video"
            ></iframe>
            <button
              v-else
              type="button"
              class="thumb-play"
              @click="playing[activeProject.title] = true"
              :aria-label="'Play ' + activeProject.title + ' demo video'"
            >
              <img v-if="activeProject.image" :src="activeProject.image" :alt="activeProject.title" class="thumb-img" />
              <span v-if="activeProject.image" class="thumb-overlay" aria-hidden="true"></span>
              <i v-if="!activeProject.image" :class="'pi ' + activeProject.thumbIcon" class="thumb-bg-icon"></i>
              <span class="play-btn"><i class="pi pi-play-fill"></i></span>
            </button>
          </div>
          <div class="project-thumb modal-thumb thumb-placeholder" v-else-if="activeProject.image">
            <a v-if="activeProject.link" :href="activeProject.link" target="_blank" rel="noopener" class="thumb-link" :aria-label="'Visit ' + activeProject.title">
              <img :src="activeProject.image" :alt="activeProject.title" class="thumb-img" />
              <span class="thumb-overlay" aria-hidden="true"></span>
              <span class="visit-badge" aria-hidden="true">Visit website <i class="pi pi-external-link"></i></span>
            </a>
            <img v-else :src="activeProject.image" :alt="activeProject.title" class="thumb-img" />
          </div>
          <div class="project-thumb modal-thumb thumb-placeholder" v-else>
            <i :class="'pi ' + activeProject.thumbIcon"></i>
          </div>

          <div class="modal-body">
            <div class="project-head">
              <span class="project-tag">{{ activeProject.tag }}</span>
              <a
                v-if="activeProject.repo"
                :href="activeProject.repo"
                target="_blank"
                rel="noopener"
                class="repo-link"
                :aria-label="'View ' + activeProject.title + ' source on GitHub'"
              >
                <i class="pi pi-github"></i> Source
              </a>
            </div>
            <h3>{{ activeProject.title }}</h3>
            <span class="project-period">{{ activeProject.period }}</span>

            <p class="project-desc">{{ activeProject.description }}</p>
            <ul class="project-points">
              <li v-for="point in activeProject.points" :key="point">{{ point }}</li>
            </ul>

            <div class="project-stack">
              <span v-for="s in activeProject.stack" :key="s" class="mini-chip">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive, ref, watch, onUnmounted } from 'vue'

const playing = reactive({})
const activeProject = ref(null)

watch(activeProject, (project) => {
  document.body.style.overflow = project ? 'hidden' : ''
})

function onKeydown(e) {
  if (e.key === 'Escape') activeProject.value = null
}
window.addEventListener('keydown', onKeydown)
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function withAutoplay(url) {
  if (!url) return url
  return url + (url.includes('?') ? '&' : '?') + 'autoplay=1'
}

// To attach a demo video to a project, add either:
//   video: '<embed URL>'   — YouTube: 'https://www.youtube.com/embed/VIDEO_ID'
//                             Google Drive: 'https://drive.google.com/file/d/FILE_ID/preview'
//                             (Drive file must be shared as "Anyone with the link")
//   videoFile: '/videos/name.mp4' — a local file placed in the public/videos folder
// image: '/images/name.png' shows a cover photo (as the video poster, or standalone if no video).
// Without any of these, the thumbIcon renders as a placeholder graphic instead.
// To show a GitHub link on the card, set repo: 'https://github.com/<user>/<repo>'.
const projects = [
  {
    tag: 'Work Project',
    title: 'CzarinaForex — Forex Trading Platform',
    period: 'Jun 2024 – Present',
    video: '',
    repo: '',
    image: '',
    thumbIcon: 'pi-chart-line',
    description:
      'Sole engineer maintaining three production ASP.NET Core applications (HeadOffice, Outlet, Patron) for a live forex trading platform.',
    points: [
      'Diagnosed and resolved out-of-memory crashes, restoring full production availability.',
      'Replaced Azure Service Bus queue hops with direct EF Core writes, cutting data retrieval latency from 3+ seconds to milliseconds.',
      'Led the REST API migration and integrated a Vue 3 / Vite frontend, decoupling the client from the legacy queue-driven backend.',
    ],
    stack: ['ASP.NET Core', 'EF Core', 'SQL Server', 'Azure', 'Vue 3'],
  },
  {
    tag: 'Client Project',
    title: 'Wedding Invitation Web App with Admin Dashboard',
    period: '2024',
    video: '',
    repo: '',
    image: '/images/WeddingInvitation1.png',
    link: 'https://monxkarlla.knotiva.my/',
    thumbIcon: 'pi-heart',
    description:
      'A public-facing digital wedding invitation paired with a private admin dashboard for guest management.',
    points: [
      'Integrated Firebase Firestore for RSVP tracking and guest list management.',
      'Used Firebase Realtime Database to sync attendance changes live without a page reload.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
  },
  {
    tag: 'Client Project',
    title: 'Wedding Invitation Web App — Joseph & Kate',
    period: '2026',
    video: '',
    repo: '',
    image: '/images/WeddingInvitation2.png',
    link: 'https://kate-otep.vercel.app/',
    thumbIcon: 'pi-heart',
    description:
      'A second client wedding invitation site, built on the same public invitation + admin dashboard pattern as the first, with an expanded set of guest-facing pages.',
    points: [
      'Added dedicated Schedule, Entourage, Attire, and Registry pages alongside RSVP tracking.',
      'Reused the Firebase Firestore + Realtime Database RSVP pipeline from the first build, restyled for a new couple.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
  },
  {
    tag: 'Personal Project',
    title: 'Knotiva — Digital Wedding Invitation Landing Page',
    period: '2026',
    video: '',
    repo: '',
    image: '/images/landingpage.png',
    link: 'https://knotiva.my/',
    thumbIcon: 'pi-heart',
    description:
      'A landing page for Knotiva, a digital wedding invitation service — pick a template, submit the couple\'s names and date, and receive a finished invitation.',
    points: [
      'Built the marketing site covering templates, process, and contact.',
    ],
    stack: [],
  },
  {
    tag: 'Personal Project',
    title: 'HRMS — HR Management System',
    period: '2025 – Present',
    video: '',
    repo: '',
    image: '/images/HRMS.png',
    thumbIcon: 'pi-users',
    description:
      'A microservices HR platform — independently deployable .NET services for Identity and Timesheet, plus a Python RAG chatbot for HR Q&A and resume ranking.',
    points: [
      'Built Identity and Timesheet as separate .NET 10 services using Clean Architecture, CQRS (MediatR), FluentValidation, and EF Core 10 over SQL Server.',
      'Added a MongoDB-backed Messaging service and a FastAPI + LangChain RAG chatbot that answers HR policy questions and ranks resumes with a local FAISS vector store.',
      'Containerized the stack with Docker Compose; built the frontend in React + Vite + MUI with React Query.',
    ],
    stack: ['.NET 10', 'EF Core', 'SQL Server', 'MongoDB', 'React', 'Python', 'LangChain', 'RAG', 'Docker'],
  },
  {
    tag: 'Personal Project',
    title: 'AI / Electronics Projects',
    period: '2019 – 2023',
    video: '',
    repo: '',
    image: '',
    thumbIcon: 'pi-microchip-ai',
    description:
      'From oil-and-water separation to embedded systems — engineering-degree work exploring AI and electronics.',
    points: [
      'Built AIOWS, an autonomous oil-and-water separator using YOLOv8 for real-time object detection.',
      'Received the Excellence Award for Thesis Paper, PUP 2023.',
    ],
    stack: ['Python', 'YOLOv8', 'Electronics'],
  },
]
</script>

<style scoped>
.project-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.project-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: var(--bg-raised);
  border-bottom: 1px solid var(--line);
}
.project-thumb video,
.project-thumb iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.thumb-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 20%, rgba(224, 160, 79, 0.14), transparent 60%), var(--bg-raised);
}
.thumb-placeholder i {
  font-size: 38px;
  color: var(--copper);
  opacity: 0.75;
}
.thumb-play {
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 20%, rgba(224, 160, 79, 0.14), transparent 60%), var(--bg-raised);
}
.thumb-bg-icon {
  font-size: 38px;
  color: var(--copper);
  opacity: 0.4;
}
.thumb-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 10, 8, 0.32);
}
.thumb-link {
  position: absolute;
  inset: 0;
  display: block;
}
.thumb-link .thumb-overlay {
  opacity: 0;
  transition: opacity 0.2s ease;
}
.thumb-link:hover .thumb-overlay {
  opacity: 1;
}
.visit-badge {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  opacity: 0;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.02em;
  transition: opacity 0.2s ease;
}
.thumb-link:hover .visit-badge {
  opacity: 1;
}
.visit-badge i {
  font-size: 12px;
}
.play-btn {
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--copper);
  color: #17110a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  box-shadow: 0 6px 20px -4px rgba(0, 0, 0, 0.5);
  transition: transform 0.15s ease, background 0.15s ease;
}
.thumb-play:hover .play-btn {
  transform: scale(1.08);
  background: var(--copper-bright);
}
.project-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.project-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--copper-bright);
}
.repo-link {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 12px;
  text-decoration: none;
  transition: color 0.15s ease;
}
.repo-link:hover {
  color: var(--copper-bright);
}
.project-body h3,
.modal-body h3 {
  font-family: var(--font-display);
  font-size: 17px;
  margin: 8px 0 4px;
  color: var(--text);
  line-height: 1.3;
}
.project-period {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-faint);
}
.project-desc {
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.6;
  margin: 12px 0 12px;
}
.project-details {
  position: relative;
  max-height: 128px;
  overflow: hidden;
}
.project-details::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 32px;
  background: linear-gradient(to bottom, transparent, var(--bg-card));
  pointer-events: none;
}
.project-points {
  margin: 0 0 16px;
  padding-left: 18px;
  color: var(--text-dim);
}
.project-points li {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 5px;
}
.project-points li::marker {
  color: var(--copper);
}
.view-btn {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--copper-bright);
  margin: 10px 0 16px;
}
.view-btn i {
  font-size: 10px;
}
.view-btn:hover {
  color: var(--copper);
}
.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: auto;
}
.mini-chip {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-faint);
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 4px 8px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 10, 8, 0.78);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 100;
}
.modal-card {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 88vh;
  overflow-y: auto;
  padding: 0;
}
.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--bg-card);
  color: var(--text-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.modal-close:hover {
  border-color: var(--copper);
  color: var(--copper-bright);
}
.modal-thumb {
  aspect-ratio: 16 / 9;
  border-radius: 14px 14px 0 0;
  border-bottom: 1px solid var(--line);
}
.modal-body {
  padding: 26px;
}
.modal-body .project-desc {
  margin: 12px 0 14px;
}
.modal-body .project-points {
  margin: 0 0 20px;
}
</style>
