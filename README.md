# Boge Neurovascular Framework Intelligence (BNFI)

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![Status](https://img.shields.io/badge/status-active%20research-success.svg)]()
[![Documentation](https://img.shields.io/badge/docs-online-informational.svg)](https://oluwafemoli.github.io/boge-neurovascular-Framework-inteligence/)

</div>

## Overview

**Boge Neurovascular Framework Intelligence (BNFI)** is an advanced computational neuroscience framework designed for modeling neurovascular coupling, cerebral autoregulation, and dynamic hemodynamic responses under physiological and pathological conditions. 

The framework bridges the gap between microscopic neural activity and macroscopic hemodynamic signals (such as fNIRS and fMRI-BOLD), implementing expanded Balloon-Windkessel ODE models and neuro-glial metabolic interaction equations.

---

## Key Features

- **Multi-Scale Hemodynamic Modeling:** Coupled differential equations simulating neural firing rate ($u$), vascular tone ($\epsilon$), cerebral blood flow (CBF), and blood oxygen level-dependent (BOLD) contrast.
- **Pathological Vasoreactivity Benchmarks:** Built-in clinical datasets and simulation suites for impaired autoregulation and stroke recovery analysis.
- **Interactive Web Portal:** Fully responsive academic landing page and live interactive hemodynamics simulator.
- **Developer-Friendly Python API:** Easy integration into custom neural data processing and machine learning pipelines.

---

## Installation

Clone the repository and install the package via pip:

```bash
git clone https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence.git
cd boge-neurovascular-Framework-inteligence
pip install -e .
```

---

## Quickstart Example

```python
from boge_neurovascular import NeurovascularModel, SimulationEngine

# Initialize model with physiological parameters
model = NeurovascularModel(tau_s=2.5, alpha=0.38, epsilon=0.82)

# Run simulation over 30 seconds
results = SimulationEngine.run(model, stimulus_duration=5.0, total_time=30.0, dt=0.001)

# Export results
results.to_csv("simulation_output.csv")
print("Max BOLD Response:", results.max_bold())
```

---

## Repository Structure

```text
boge-neurovascular-Framework-inteligence/
├── index.html                 # Official academic web portal & live simulator
├── README.md                  # Project documentation & citation guide
├── setup.py                   # Package installation configuration
├── boge_neurovascular/        # Core Python package source code
│   ├── __init__.py
│   ├── model.py               # ODE solvers & Balloon-Windkessel equations
│   └── simulator.py           # Simulation engine & waveform generators
└── datasets/                  # Benchmark time-series & clinical recordings
    ├── bhsd_v3.csv
    └── pathological_vaso.csv
```

---

## Citation

If you use BNFI in your research, please cite:

```bibtex
@software{boge2026neurovascular,
  author = {Oluwafemi, Olukanni and Research Group},
  title = {Boge Neurovascular Framework Intelligence: A Computational Suite for Cerebral Hemodynamics},
  year = {2026},
  publisher = {GitHub},
  journal = {GitHub repository},
  url = {https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence}
}
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
