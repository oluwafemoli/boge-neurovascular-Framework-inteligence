// BOGE Neurovascular Framework Intelligence - Interactive Directory & Module Inspector

const MODULES = [
  {
    id: "hemodynamic-solver",
    category: "Hemodynamic Modeling",
    version: "v1.4.2",
    title: "1D-0D Coupled Cerebral Hemodynamic Solver",
    description: "Finite-volume and lumped-parameter solver for Circle of Willis arterial networks, modeling pulsatile blood flow, autoregulation, and collateral recruitment.",
    tags: ["Python", "NumPy/SciPy", "Navier-Stokes 1D"],
    repoPath: "src/hemodynamics/coupled_solver.py",
    structure: `boge-neurovascular-Framework-inteligence/
├── src/hemodynamics/
│   ├── coupled_solver.py
│   ├── circle_of_willis_graph.py
│   └── windkessel_bc.py`,
    command: "python -m src.hemodynamics.coupled_solver --config configs/cow_baseline.yaml"
  },
  {
    id: "autoregulation-nn",
    category: "Hemodynamic Modeling",
    version: "v1.3.0",
    title: "Physics-Informed Neurovascular Coupling (PINN)",
    description: "Neural surrogate model integrating dynamic cerebral autoregulation (dCA) equations with transcranial Doppler (TCD) and arterial blood pressure time series.",
    tags: ["PyTorch", "PINN", "dCA"],
    repoPath: "src/intelligence/neuro_pinn.py",
    structure: `boge-neurovascular-Framework-inteligence/
├── src/intelligence/
│   ├── neuro_pinn.py
│   ├── loss_residuals.py
│   └── calibration.py`,
    command: "python -m src.intelligence.neuro_pinn --train --epochs 500 --dataset synthetic_dca"
  },
  {
    id: "cow-benchmarks",
    category: "Datasets & Benchmarks",
    version: "v2.1.0",
    title: "Synthetic & Clinical Vascular Topology Benchmarks",
    description: "Curated multi-modal benchmarks featuring anatomical Circle of Willis variants, stenosis severity levels, and reference pressure-flow waveforms.",
    tags: ["HDF5", "JSON-Graph", "Benchmark"],
    repoPath: "data/benchmarks/",
    structure: `boge-neurovascular-Framework-inteligence/
├── data/benchmarks/
│   ├── cow_variants_120.h5
│   ├── stenosis_stenotic_cases.json
│   └── validation_metrics.csv`,
    command: "python scripts/fetch_benchmarks.py --suite cow_variants_120 --verify-checksum"
  },
  {
    id: "tcd-waveform-pipeline",
    category: "Analysis Pipelines",
    version: "v1.2.1",
    title: "TCD & ABP Signal Processing Pipeline",
    description: "Automated beat-to-beat feature extraction, artifact rejection, transfer function analysis (TFA), and pulsatility index computation.",
    tags: ["Signal Processing", "FFT/TFA", "Pandas"],
    repoPath: "src/pipelines/tfa_analyzer.py",
    structure: `boge-neurovascular-Framework-inteligence/
├── src/pipelines/
│   ├── tfa_analyzer.py
│   ├── beat_segmentation.py
│   └── quality_index.py`,
    command: "python -m src.pipelines.tfa_analyzer --input data/raw/subject_01.csv --fs 100"
  },
  {
    id: "vessel-graph-extractor",
    category: "Analysis Pipelines",
    version: "v1.1.0",
    title: "Centerline & Radius Morphometry Extractor",
    description: "Extracts 1D vascular centerlines, bifurcation angles, and cross-sectional radii from segmented MRA/CTA vessel trees for solver meshing.",
    tags: ["VMTK/VTK", "Morphometry", "Mesh"],
    repoPath: "src/pipelines/morphometry.py",
    structure: `boge-neurovascular-Framework-inteligence/
├── src/pipelines/
│   ├── morphometry.py
│   ├── centerline_prune.py
│   └── export_network.py`,
    command: "python -m src.pipelines.morphometry --mesh subject_mra.vtp --out network.json"
  },
  {
    id: "reproducible-templates",
    category: "Documentation & Templates",
    version: "v1.0.5",
    title: "Experiment Configs & Publication Figure Templates",
    description: "Standardized YAML experiment configurations, Jupyter validation notebooks, and vector-ready Matplotlib templates for neurovascular reporting.",
    tags: ["YAML", "Jupyter", "Matplotlib"],
    repoPath: "templates/",
    structure: `boge-neurovascular-Framework-inteligence/
├── templates/
│   ├── configs/baseline_experiment.yaml
│   ├── notebooks/01_quickstart_simulation.ipynb
│   └── figures/hemodynamic_panel.py`,
    command: "jupyter lab templates/notebooks/01_quickstart_simulation.ipynb"
  }
];

const CODE_SNIPPETS = {
  install: `# Clone the BOGE Neurovascular Framework Intelligence repository
git clone https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence.git
cd boge-neurovascular-Framework-inteligence

# Create virtual environment and install dependencies
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt`,

  usage: `from src.hemodynamics.coupled_solver import NeurovascularSolver
from src.intelligence.neuro_pinn import AutoregulationEstimator

# 1. Load Circle of Willis network topology & boundary conditions
solver = NeurovascularSolver.from_config("configs/cow_baseline.yaml")
hemodynamics = solver.simulate(cardiac_cycles=6, dt=1e-3)

# 2. Estimate dynamic cerebral autoregulation (dCA) index
estimator = AutoregulationEstimator.load_pretrained("weights/dca_pinn_v1.pt")
dca_metrics = estimator.infer(hemodynamics.abp, hemodynamics.cbfv_mca)
print(f"Autoregulation Index (ARI): {dca_metrics.ari:.2f}")`,

  bibtex: `@software{boge_neurovascular_framework_2026,
  author       = {Oluwafemi, Olukanni and Contributors},
  title        = {BOGE Neurovascular Framework Intelligence: Computational Hemodynamics and Dynamic Autoregulation Modeling},
  year         = {2026},
  publisher    = {GitHub},
  url          = {https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence}
}`
};

let activeCategory = "All";
let searchQuery = "";
let activeCodeTab = "install";

function renderModules() {
  const grid = document.getElementById("resourceGrid");
  if (!grid) return;

  const filtered = MODULES.filter((mod) => {
    const matchesCategory = activeCategory === "All" || mod.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      mod.title.toLowerCase().includes(q) ||
      mod.description.toLowerCase().includes(q) ||
      mod.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #64748b;">
      No framework modules matched your current filter criteria.
    </div>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (mod) => `
      <article class="resource-card">
        <div>
          <div class="card-top">
            <span class="category-tag">${mod.category}</span>
            <span class="version-tag">${mod.version}</span>
          </div>
          <h3>${mod.title}</h3>
          <p>${mod.description}</p>
          <div class="card-meta">
            ${mod.tags.map((tag) => `<span class="meta-pill">${tag}</span>`).join("")}
          </div>
        </div>
        <div class="card-footer">
          <button class="card-link" onclick="openModuleModal('${mod.id}')">Inspect Module &rarr;</button>
          <a class="card-link" href="https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence/tree/main/${mod.repoPath}" target="_blank" rel="noopener">Source</a>
        </div>
      </article>
    `
    )
    .join("");
}

function openModuleModal(id) {
  const mod = MODULES.find((m) => m.id === id);
  if (!mod) return;

  document.getElementById("modalCategory").textContent = `${mod.category} • ${mod.version}`;
  document.getElementById("modalTitle").textContent = mod.title;
  document.getElementById("modalDesc").textContent = mod.description;
  document.getElementById("modalStructure").textContent = mod.structure;
  document.getElementById("modalCommand").textContent = mod.command;
  document.getElementById("modalRepoLink").href =
    `https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence/tree/main/${mod.repoPath}`;

  document.getElementById("moduleModal").classList.add("open");
}

function closeModuleModal() {
  document.getElementById("moduleModal").classList.remove("open");
}

function renderCodeSnippet() {
  const box = document.getElementById("codeDisplay");
  if (box) {
    box.textContent = CODE_SNIPPETS[activeCodeTab];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderModules();
  renderCodeSnippet();

  // Category filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderModules();
    });
  });

  // Search input
  const searchInput = document.getElementById("resourceSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderModules();
    });
  }

  // Code tabs
  document.querySelectorAll(".code-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".code-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeCodeTab = tab.dataset.tab;
      renderCodeSnippet();
    });
  });

  // Copy button
  const copyBtn = document.getElementById("copyCodeBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(CODE_SNIPPETS[activeCodeTab]);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1800);
    });
  }

  // Modal backdrop close
  const modal = document.getElementById("moduleModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModuleModal();
    });
  }
});
