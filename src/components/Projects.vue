<template>
  <div id="projects" class="proj-block block-row">
    <div class="container">
      <div class="block-header">
        <span class="block-label"><i class="pi pi-send"></i> Featured Projects</span>
        <a href="https://github.com/kevinfabillar" target="_blank" rel="noopener" class="block-link">View All <i class="pi pi-arrow-right"></i></a>
      </div>

      <div class="grid-3col">
        <article class="card project-card" v-for="p in visibleProjects" :key="p.title">
          <button
            type="button"
            class="project-thumb thumb-btn"
            :class="{ 'thumb-placeholder': !p.image }"
            @click="activeProject = p"
            :aria-label="'View ' + p.title + ' details'"
          >
            <img v-if="p.image" :src="p.image" :alt="p.title" class="thumb-img" loading="lazy" />
            <span v-else class="thumb-empty">
              <i :class="'pi ' + p.thumbIcon"></i>
              <span>{{ p.noPreview || 'No public preview' }}</span>
            </span>
            <span class="thumb-overlay" aria-hidden="true"></span>
            <span class="visit-badge" aria-hidden="true">
              <template v-if="p.videoFile"><i class="pi pi-play-fill"></i> Watch demo</template>
              <template v-else>View details</template>
            </span>
            <span v-if="p.videoFile" class="video-pill" aria-hidden="true"><i class="pi pi-video"></i> Demo</span>
          </button>

          <div class="project-body">
            <div class="project-head">
              <span class="project-tag">{{ p.tag }}</span>
              <span class="project-period">{{ p.period }}</span>
            </div>
            <h3>{{ p.title }}</h3>
            <p class="project-desc">{{ p.description }}</p>

            <div class="project-stack">
              <span v-for="s in p.stack" :key="s" class="mini-chip">{{ s }}</span>
            </div>

            <div class="project-actions">
              <button type="button" class="view-btn" @click="activeProject = p">
                View details <i class="pi pi-arrow-right"></i>
              </button>
              <a v-if="p.link" :href="p.link" target="_blank" rel="noopener" class="action-link">
                Live site <i class="pi pi-external-link"></i>
              </a>
              <a
                v-if="p.repo"
                :href="p.repo"
                target="_blank"
                rel="noopener"
                class="action-link"
                :aria-label="'View ' + p.title + ' source on GitHub'"
              >
                <i class="pi pi-github"></i>
              </a>
            </div>
          </div>
        </article>
      </div>

      <div class="see-all-wrap" v-if="projects.length > MAX_VISIBLE">
        <button type="button" class="see-all-btn" @click="showAll = !showAll" :aria-expanded="showAll">
          {{ showAll ? 'Show less' : `See all (${projects.length})` }}
          <i :class="showAll ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="activeProject" class="modal-overlay" @click.self="activeProject = null">
        <div class="card modal-card" role="dialog" aria-modal="true" :aria-label="activeProject.title">
          <button type="button" class="modal-close" @click="activeProject = null" aria-label="Close">
            <i class="pi pi-times"></i>
          </button>

          <div class="project-thumb modal-thumb" v-if="activeProject.videoFile">
            <video
              :key="activeProject.videoFile"
              :src="activeProject.videoFile"
              :poster="activeProject.image || undefined"
              controls
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
          </div>
          <div class="project-thumb modal-thumb" v-else-if="activeProject.video">
            <iframe
              v-if="playing[activeProject.title]"
              :src="withAutoplay(activeProject.video)"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
              loading="lazy"
              title="Project demo video"
            ></iframe>
            <button
              v-else
              type="button"
              class="thumb-btn"
              @click="playing[activeProject.title] = true"
              :aria-label="'Play ' + activeProject.title + ' demo video'"
            >
              <img v-if="activeProject.image" :src="activeProject.image" :alt="activeProject.title" class="thumb-img" />
              <span class="play-btn"><i class="pi pi-play-fill"></i></span>
            </button>
          </div>
          <div class="project-thumb modal-thumb" v-else-if="activeProject.image">
            <img :src="activeProject.image" :alt="activeProject.title" class="thumb-img" />
          </div>

          <div class="modal-body" :class="{ 'modal-body--bare': !activeProject.image && !activeProject.video && !activeProject.videoFile }">
            <div class="project-head">
              <span class="project-tag">{{ activeProject.tag }}</span>
              <span class="project-period">{{ activeProject.period }}</span>
            </div>
            <h3>{{ activeProject.title }}</h3>

            <p class="modal-desc">{{ activeProject.description }}</p>
            <ul class="project-points">
              <li v-for="point in activeProject.points" :key="point">{{ point }}</li>
            </ul>

            <div class="project-stack">
              <span v-for="s in activeProject.stack" :key="s" class="mini-chip">{{ s }}</span>
            </div>

            <div class="modal-actions" v-if="activeProject.link || activeProject.repo">
              <a v-if="activeProject.link" :href="activeProject.link" target="_blank" rel="noopener" class="modal-btn modal-btn--primary">
                Visit live site <i class="pi pi-external-link"></i>
              </a>
              <a v-if="activeProject.repo" :href="activeProject.repo" target="_blank" rel="noopener" class="modal-btn">
                <i class="pi pi-github"></i> Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onUnmounted } from 'vue'

const MAX_VISIBLE = 6

const playing = reactive({})
const activeProject = ref(null)
const showAll = ref(false)

const visibleProjects = computed(() => (showAll.value ? projects : projects.slice(0, MAX_VISIBLE)))

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
//   videoFile: '/videos/name.webm' — a local file placed in the public/videos folder
// Videos only play inside the "View details" popup; the card always shows the image.
// image: '/images/name.png' shows a cover photo (also the video poster).
// Without an image, the thumbIcon and noPreview text render as a placeholder instead.
// To show a GitHub link on the card, set repo: 'https://github.com/<user>/<repo>'.
const projects = [
  {
    tag: 'Client Project',
    title: 'Wedding Invitation Web App with Admin Dashboard',
    period: '2024',
    video: '',
    repo: '',
    image: '/images/WeddingInvitation1.png',
    videoFile: '/videos/wedding-monxkarlla.webm',
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
    videoFile: '/videos/knotiva.webm',
    link: 'https://knotiva.my/',
    thumbIcon: 'pi-heart',
    description:
      'A landing page for Knotiva, a digital wedding invitation service — pick a template, submit the couple\'s names and date, and receive a finished invitation.',
    points: [
      'Built a procedural 3D mascot with Three.js, rendered through a custom <three-d-stage> Web Component (Shadow DOM).',
      'Client-side routed with React Router across hero, animation, and character views; deployed as a static SPA on Vercel.',
    ],
    stack: ['React', 'Three.js', 'React Router', 'Vite', 'Vercel'],
  },
  {
    tag: 'Personal Project',
    title: 'Construction System — Project & Site Management',
    period: '2026',
    video: '',
    repo: '',
    image: '/images/ConstructionSystem.png',
    link: 'https://brave-ocean-0b2522100.6.azurestaticapps.net/dashboard',
    thumbIcon: 'pi-building',
    description:
      'A construction management system covering projects, tasks, daily site reports, manpower and attendance, materials and inventory, procurement, and budget tracking.',
    points: [
      'Built a .NET 10 Web API (Controllers → Services → Repositories) with EF Core 10 over SQL Server / Azure SQL, JWT auth with role-based permissions, and OpenAPI + Scalar docs.',
      'Stored uploaded files on disk and served them through expiring signed links.',
      'Built the Vue 3 + Vite frontend with Vuex, PrimeVue 4 and Chart.js dashboards, plus PDF (jsPDF) and Excel (ExcelJS) report exports.',
      'Covered the API with xUnit integration tests (Mvc.Testing) and Coverlet coverage; deployed on Azure.',
    ],
    stack: ['.NET 10', 'EF Core', 'SQL Server', 'Azure', 'Vue 3', 'PrimeVue', 'Chart.js', 'xUnit'],
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
    noPreview: 'Thesis & hardware work',
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

/* Thumbnail */
.project-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
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
  background: #000;
}
.thumb-btn {
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-raised);
  border-bottom: 1px solid var(--line);
}
.modal-thumb .thumb-btn {
  height: 100%;
  border: 0;
}
.thumb-placeholder {
  background:
    radial-gradient(circle at 25% 20%, rgba(224, 160, 79, 0.16), transparent 55%),
    repeating-linear-gradient(0deg, transparent 0 23px, rgba(255, 255, 255, 0.025) 23px 24px),
    repeating-linear-gradient(90deg, transparent 0 23px, rgba(255, 255, 255, 0.025) 23px 24px),
    var(--bg-raised);
}
.thumb-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.thumb-empty i {
  font-size: 34px;
  color: var(--copper);
  opacity: 0.8;
}
.thumb-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s ease;
}
.thumb-btn:hover .thumb-img {
  transform: scale(1.03);
}
.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 10, 8, 0.55);
  opacity: 0;
  transition: opacity 0.2s ease;
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
.visit-badge i {
  font-size: 12px;
}
.thumb-btn:hover .thumb-overlay,
.thumb-btn:hover .visit-badge,
.thumb-btn:focus-visible .thumb-overlay,
.thumb-btn:focus-visible .visit-badge {
  opacity: 1;
}
.video-pill {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 5px;
  background: rgba(6, 10, 8, 0.72);
  color: var(--copper-bright);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.04em;
}
.video-pill i {
  font-size: 10px;
}
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
}

/* Card body */
.project-body {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-head {
  display: flex;
  align-items: baseline;
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
.project-period {
  flex: none;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
}
.project-body h3,
.modal-body h3 {
  font-family: var(--font-display);
  font-size: 17px;
  margin: 6px 0 8px;
  color: var(--text);
  line-height: 1.3;
}
.project-desc {
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.55;
  margin: 0 0 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.project-card .project-stack {
  margin-top: auto;
}
.mini-chip {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 3px 7px;
}
.project-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.view-btn,
.action-link {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--copper-bright);
  text-decoration: none;
  transition: color 0.15s ease;
}
.action-link {
  color: var(--text-dim);
}
.action-link:last-child {
  margin-left: auto;
}
.view-btn i,
.action-link i {
  font-size: 10px;
}
.action-link .pi-github {
  font-size: 15px;
}
.view-btn:hover,
.action-link:hover {
  color: var(--copper);
}

/* See all */
.see-all-wrap {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
.see-all-btn {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--copper-bright);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 20px;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.see-all-btn i {
  font-size: 11px;
}
.see-all-btn:hover {
  border-color: var(--copper);
  color: var(--copper);
}

/* Details modal */
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
  max-width: 760px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 0;
}
.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(6, 10, 8, 0.7);
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
  border-radius: 14px 14px 0 0;
}
.modal-body {
  padding: 22px 24px 24px;
}
.modal-body--bare {
  padding-top: 26px;
  padding-right: 60px;
}
.modal-desc {
  color: var(--text-dim);
  font-size: 14.5px;
  line-height: 1.6;
  margin: 0 0 12px;
}
.project-points {
  margin: 0 0 18px;
  padding-left: 18px;
  color: var(--text-dim);
}
.project-points li {
  font-size: 13.5px;
  line-height: 1.6;
  margin-bottom: 5px;
}
.project-points li::marker {
  color: var(--copper);
}
.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.modal-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 8px;
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-dim);
  text-decoration: none;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}
.modal-btn i {
  font-size: 11px;
}
.modal-btn:hover {
  border-color: var(--copper);
  color: var(--copper-bright);
}
.modal-btn--primary {
  background: var(--copper);
  border-color: var(--copper);
  color: #17110a;
}
.modal-btn--primary:hover {
  background: var(--copper-bright);
  color: #17110a;
}

@media (max-width: 560px) {
  .modal-overlay {
    padding: 12px;
  }
  .modal-body {
    padding: 18px;
  }
}
</style>
