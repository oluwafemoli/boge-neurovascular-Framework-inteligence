# BOGE Neurovascular Framework Intelligence

[![License: MIT](https://img.shields.io/badge/License-MIT-0d9488.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Release-v1.0.0-0ea5e9.svg)](https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence)
[![GitHub Pages](https://img.shields.io/badge/Portal-GitHub%20Pages-0f172a.svg)](https://oluwafemoli.github.io/boge-neurovascular-Framework-inteligence/)

> **Computational modeling, hemodynamic analysis pipelines, and open-source intelligence tools for neurovascular dynamics research.**

---

## Overview

**BOGE Neurovascular Framework Intelligence** is a modular, open-source computational suite designed for reproducible cerebral blood flow (CBF) simulation, dynamic cerebral autoregulation (dCA) inference, and multi-modal cerebrovascular telemetry. It bridges biophysical hemodynamic modeling (multi-compartment Windkessel and 1D–0D solvers) with physics-informed neural networks (PINNs) to estimate latent vascular resistance and compliance from physiological signals such as Transcranial Doppler (TCD) ultrasound, Near-Infrared Spectroscopy (NIRS), and continuous Arterial Blood Pressure (ABP).

This repository also includes a standalone, static **Academic Research Portal & Resources Template** ready for immediate deployment on GitHub Pages.

---

## System Architecture

The framework operates as a four-stage end-to-end pipeline (`Architecture Spec: BOGE-NV-ARCH-01`):

1. **Signal Ingestion (`pipelines/preprocessing/`)**: Standardization, denoising, and beat-to-beat segmentation of TCD velocity waveforms, NIRS, and ABP telemetry.
2. **Biophysical Modeling (`models/hemodynamics/`)**: Multi-compartment vascular resistance and dynamic cerebral autoregulation (dCA) ODE/Simulink solvers across arterial–venous beds.
3. **Neural Inference (`src/boge_nv/engine/`)**: Physics-informed neural networks (PINNs) embedding hemodynamic conservation constraints for real-time latent parameter estimation.
4. **Telemetry & Reporting (`docs/`)**: Reproducible static web dashboards, HDF5/JSON schema validation, and publication-ready figure exports.

---

## Repository & Website Directory Structure

```text
boge-neurovascular-Framework-inteligence/
├── index.html                      # Single-file interactive research & resources portal
├── README.md                       # Project documentation & deployment guide
├── requirements.txt                # Python scientific & ML dependencies
├── src/
│   └── boge_nv/
│       └── engine/                 # Core neurovascular coupling neural operators
├── models/
│   └── hemodynamics/               # 4-compartment Windkessel & autoregulation solvers
├── pipelines/
│   └── preprocessing/              # Waveform denoising & PI/RI hemodynamic index extraction
├── data/
│   ├── schemas/                    # Standardized HDF5 & JSON-Graph validation schemas
│   └── benchmarks/                 # Curated synthetic & clinical reference cohorts
└── docs/
    ├── index.html                  # Lab overview & architecture landing page
    ├── research.html               # Research pillars & computational methodology
    ├── resources.html              # Interactive module directory & BibTeX citation tool
    └── assets/                     # Stylesheets and modular JavaScript catalog
```

---

## Quick-Start Installation

### 1. Clone the Repository
```bash
git clone https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence.git
cd boge-neurovascular-Framework-inteligence
```

### 2. Set Up a Virtual Environment
```bash
python -m venv .venv
source .venv/bin/activate        # macOS / Linux
# .venv\Scripts\activate         # Windows PowerShell
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## Usage Example

Run a baseline multi-compartment neurovascular coupling simulation and extract Gosling Pulsatility Index ($PI$) and Resistance Index ($RI$) metrics:

```python
from boge_nv.engine import NeurovascularCouplingModel
from boge_nv.pipelines import extract_pulsatility_indices

# Initialize 4-compartment neurovascular model with dynamic autoregulation
model = NeurovascularCouplingModel(compartments=4, autoregulation=True)

# Run hemodynamic inference on a standardized HDF5 cohort
results = model.simulate(input_path="data/benchmarks/synthetic_cbf_baseline.h5")
indices = extract_pulsatility_indices(results.cbf_velocity, fs=1000)

print(f"Mean CBFV: {indices['mean_velocity']:.2f} cm/s | PI: {indices['pi']:.3f}")
```

### Command-Line Execution
* **Train Physics-Informed Coupling Engine**:
  ```bash
  python -m boge_nv.engine.train --config configs/cbf_coupling.yaml
  ```
* **Run 4-Compartment Windkessel Simulation**:
  ```bash
  python models/hemodynamics/simulate_windkessel.py --compartments 4 --dt 0.005
  ```
* **Extract Pulsatility & Resistance Indices**:
  ```bash
  python pipelines/preprocessing/extract_indices.py --fs 1000 --bandpass 0.5 20
  ```

---

## Deploying the Web Portal on GitHub Pages

The included web template (`index.html` or the multi-page `docs/` bundle) requires zero build steps or backend servers:

1. Push `index.html` (or the multi-page template files) to the `main` branch of your GitHub repository.
2. Go to **Settings → Pages** in your repository on GitHub.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the `main` branch and either `/ (root)` or `/docs` as your target folder, then click **Save**.
5. Your portal will be live at `https://oluwafemoli.github.io/boge-neurovascular-Framework-inteligence/`.

---

## Academic Citation

If you use this framework, simulation models, or web template in your research, please cite it using the following BibTeX entry:

```bibtex
@software{boge_neurovascular_framework_2026,
  author       = {Oluwafemi, B. and BOGE Neurovascular Research Group},
  title        = {{BOGE Neurovascular Framework Intelligence: Computational Modeling and Hemodynamic Analysis Suite}},
  year         = {2026},
  version      = {1.0.0},
  publisher    = {GitHub},
  url          = {https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence}
}
```

---

## Contributing & License

Contributions, bug reports, and feature requests are welcome via the [GitHub Issue Tracker](https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence/issues). Please ensure all pull requests adhere to the reproducibility and schema validation guidelines in `docs/sop/`.

Distributed under the **MIT License**. See `LICENSE` for more information.