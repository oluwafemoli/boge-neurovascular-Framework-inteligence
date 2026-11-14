from setuptools import setup, find_packages

setup(
    name="boge_neurovascular",
    version="2.4.0",
    description="Computational framework for neurovascular coupling and cerebral hemodynamics",
    long_description=open("README.md", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    author="Oluwafemi Olukanni",
    url="https://github.com/oluwafemoli/boge-neurovascular-Framework-inteligence",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Topic :: Scientific/Engineering :: Medical Science Apps.",
    ],
    python_requires=">=3.8",
)
