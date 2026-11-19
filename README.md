# Yahdhih Abdel Wedoud

**Calcul haute performance · GPU · solveurs numériques**

Élève ingénieur en dernière année à l'**ENSIIE** et en **Master 2 Calcul Haute Performance, Simulation (CHPS)**, Université Paris-Saclay.
Je cherche un **stage de fin d'études de 6 mois à partir de mars 2027**, en Île-de-France, en HPC.

Ma méthode, sur chaque projet : mesurer de façon reproductible sous SLURM, profiler, vérifier la justesse contre une solution connue, puis expliquer l'écart au pic matériel.

---

## Projets sur le supercalculateur ROMEO (GPU NVIDIA GH200)

| Projet | Résultat clé | Outils |
|---|---|---|
| [**Gradient conjugué multi-GPU**](https://github.com/Yahdhih/cg-multigpu-mpi) | 83 % d'efficacité forte sur 16 GPU (4 nœuds), contre 46 % en passant par l'hôte | MPI CUDA-aware, CUDA, SLURM |
| [**CUDA contre OpenMP offload**](https://github.com/Yahdhih/cg-openmp-vs-cuda-gh200) | Écart ramené de 1,55 à 1,85 fois à 1,05 à 1,12 fois, causes trouvées au profileur | OpenMP target, NVHPC, cuSPARSE, Nsight Systems |
| [**Préconditionneur multigrille sur GPU**](https://github.com/Yahdhih/multigrid-pcg-cuda) | 61 fois plus rapide que le PCG Jacobi à 133 millions d'inconnues, 8 à 9 itérations quelle que soit la taille | CUDA, matrix-free |
| [**Stencil sismique d'ordre 8 (RTM)**](https://github.com/Yahdhih/rtm-stencil-cuda) | +113 % sur les petits domaines par découpage en z ; 2,1 fois sur les 72 cœurs Grace | CUDA, OpenMP |

---

## Compétences

- **Calcul parallèle** : CUDA, OpenMP (CPU et offload GPU), MPI, SLURM
- **Méthodes numériques** : gradient conjugué, multigrille, matrices creuses (CSR), stencils, volumes finis
- **Performance** : profilage, bande passante et écart au pic, scalabilité forte et faible
- **Langages** : C++, C, Python, Bash ; Git, Linux, Docker

## Parcours

- **Stage développement et machine learning**, Mauri-conseils (2026) : modèle physique couplé à un modèle statistique, suite de 88 tests passée de 6 minutes à 9 secondes.
- **Stage sécurité et administration systèmes**, Banque Centrale de Mauritanie (2025).
- Sélection nationale aux **Olympiades internationales de mathématiques** (2021).

## Contact

[LinkedIn](https://www.linkedin.com/in/yahdhih-abdel-wedoud-968829340/) · [yahdhih16abdelwedoud@gmail.com](mailto:yahdhih16abdelwedoud@gmail.com)
