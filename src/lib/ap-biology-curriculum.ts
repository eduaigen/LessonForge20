type Lesson = {
    title: string;
    objective: string;
};

type Topic = {
    topic: string;
    lessons: Lesson[];
};

type Unit = {
    unit: string;
    topics: { [key: string]: Topic };
};

export const apBiologyCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Chemistry of Life": {
            unit: "Unit 1: Chemistry of Life",
            topics: {
                "Topic 1.1: Structure of Water and Hydrogen Bonding": {
                    topic: "Topic 1.1: Structure of Water and Hydrogen Bonding",
                    lessons: [{ title: "Properties of Water", objective: "Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function." }]
                },
                "Topic 1.2: Elements of Life": {
                    topic: "Topic 1.2: Elements of Life",
                    lessons: [{ title: "Elements of Life", objective: "Describe the composition of macromolecules required by living organisms." }]
                },
                "Topic 1.3: Introduction to Biological Macromolecules": {
                    topic: "Topic 1.3: Introduction to Biological Macromolecules",
                    lessons: [{ title: "Introduction to Biological Macromolecules", objective: "Describe the chemical reactions that build and break biological macromolecules." }]
                },
                "Topic 1.4: Properties of Biological Macromolecules": {
                    topic: "Topic 1.4: Properties of Biological Macromolecules",
                    lessons: [{ title: "Properties of Carbohydrates", objective: "Describe the structure and function of carbohydrates." }]
                },
                "Topic 1.5: Structure and Function of Biological Macromolecules": {
                    topic: "Topic 1.5: Structure and Function of Biological Macromolecules",
                    lessons: [{ title: "Structure and Function of Lipids", objective: "Describe the structure and function of lipids." }]
                },
                "Topic 1.6: Nucleic Acids": {
                    topic: "Topic 1.6: Nucleic Acids",
                    lessons: [{ title: "Structure and Function of Nucleic Acids", objective: "Describe the structure and function of DNA and RNA." }]
                },
                 "Topic 1.7: Proteins": {
                    topic: "Topic 1.7: Proteins",
                    lessons: [{ title: "Structure and Function of Proteins", objective: "Describe the structure and function of proteins." }]
                }
            }
        },
        "Unit 2: Cell Structure and Function": {
            unit: "Unit 2: Cell Structure and Function",
            topics: {
                "Topic 2.1: Cell Structure - Subcellular Components": {
                    topic: "Topic 2.1: Cell Structure - Subcellular Components",
                    lessons: [{ title: "Subcellular Components", objective: "Explain how the structure and function of subcellular components and organelles contribute to the function of cells." }]
                },
                "Topic 2.2: Cell Size": {
                    topic: "Topic 2.2: Cell Size",
                    lessons: [{ title: "Cell Size and Surface Area to Volume Ratio", objective: "Explain the effect of surface area-to-volume ratios on the exchange of materials between cells or organisms and the environment." }]
                },
                "Topic 2.3: Plasma Membranes": {
                    topic: "Topic 2.3: Plasma Membranes",
                    lessons: [{ title: "The Fluid Mosaic Model", objective: "Describe the roles of each of the components of the cell membrane in maintaining the internal environment of the cell." }]
                },
                "Topic 2.4: Membrane Permeability": {
                    topic: "Topic 2.4: Membrane Permeability",
                    lessons: [{ title: "Selective Permeability of Membranes", objective: "Explain how the structure of biological membranes influences selective permeability." }]
                },
                "Topic 2.5: Membrane Transport": {
                    topic: "Topic 2.5: Membrane Transport",
                    lessons: [{ title: "Mechanisms of Transport", objective: "Describe the mechanisms that organisms use to maintain solute and water balance and transport large molecules across the plasma membrane." }]
                },
                "Topic 2.6: Facilitated Diffusion": {
                    topic: "Topic 2.6: Facilitated Diffusion",
                    lessons: [{ title: "Movement of Molecules Across Membranes", objective: "Explain how the structure of a molecule affects its ability to pass through the plasma membrane." }]
                },
                "Topic 2.7: Tonicity and Osmoregulation": {
                    topic: "Topic 2.7: Tonicity and Osmoregulation",
                    lessons: [{ title: "Tonicity and Osmoregulation", objective: "Explain how concentration gradients and osmoregulatory mechanisms contribute to the health and survival of organisms." }]
                },
                "Topic 2.8: Mechanisms of Transport": {
                    topic: "Topic 2.8: Mechanisms of Transport",
                    lessons: [{ title: "Active Transport", objective: "Describe the processes that allow ions and other molecules to move across membranes." }]
                },
                "Topic 2.9: Cell Compartmentalization": {
                    topic: "Topic 2.9: Cell Compartmentalization",
                    lessons: [{ title: "Eukaryotic Cell Compartmentalization", objective: "Describe the membrane-bound structures of the eukaryotic cell and explain how they contribute to compartmentalization of eukaryotic cell functions." }]
                },
                "Topic 2.10: Origins of Cell Compartmentalization": {
                    topic: "Topic 2.10: Origins of Cell Compartmentalization",
                    lessons: [{ title: "Endosymbiotic Theory", objective: "Describe similarities and/or differences in compartmentalization between prokaryotic and eukaryotic cells." }]
                }
            }
        },
        "Unit 3: Cellular Energetics": {
            unit: "Unit 3: Cellular Energetics",
            topics: {
                "Topic 3.1: Enzymes": {
                    topic: "Topic 3.1: Enzymes",
                    lessons: [{ title: "Enzyme Structure and Function", objective: "Explain how enzymes affect the rate of biological reactions." }]
                },
                "Topic 3.2: Environmental Impacts on Enzyme Function": {
                    topic: "Topic 3.2: Environmental Impacts on Enzyme Function",
                    lessons: [{ title: "Enzyme Denaturation and Regulation", objective: "Explain how changes to the structure of an enzyme may affect its function and how the cellular environment affects enzyme activity." }]
                },
                "Topic 3.3: Cellular Energy": {
                    topic: "Topic 3.3: Cellular Energy",
                    lessons: [{ title: "Energy in Living Systems", objective: "Describe the role of energy in living organisms and explain how shared, conserved processes support the concept of common ancestry." }]
                },
                "Topic 3.4: Photosynthesis": {
                    topic: "Topic 3.4: Photosynthesis",
                    lessons: [{ title: "Photosynthesis Explained", objective: "Describe the photosynthetic processes and structural features of the chloroplast that allow organisms to capture and store energy." }]
                },
                "Topic 3.5: Cellular Respiration": {
                    topic: "Topic 3.5: Cellular Respiration",
                    lessons: [{ title: "Cellular Respiration Explained", objective: "Describe the processes and structural features of mitochondria that allow organisms to use energy stored in biological macromolecules." }]
                }
            }
        },
        "Unit 4: Cell Communication and Cell Cycle": {
            unit: "Unit 4: Cell Communication and Cell Cycle",
            topics: {
                "Topic 4.1: Cell Communication": {
                    topic: "Topic 4.1: Cell Communication",
                    lessons: [{ title: "Modes of Cell Communication", objective: "Describe the ways that cells can communicate with one another over short and long distances." }]
                },
                "Topic 4.2: Introduction to Signal Transduction": {
                    topic: "Topic 4.2: Introduction to Signal Transduction",
                    lessons: [{ title: "Signal Transduction Pathways", objective: "Describe the components of a signal transduction pathway and their role in producing a cellular response." }]
                },
                "Topic 4.3: Signal Transduction Pathways": {
                    topic: "Topic 4.3: Signal Transduction Pathways",
                    lessons: [{ title: "Cellular Responses to Signals", objective: "Describe the different types of cellular responses elicited by a signal transduction pathway and explain how changes in the pathway affect its activity." }]
                },
                "Topic 4.4: Feedback": {
                    topic: "Topic 4.4: Feedback",
                    lessons: [{ title: "Feedback Mechanisms and Homeostasis", objective: "Explain how positive and negative feedback helps maintain homeostasis." }]
                },
                "Topic 4.5: Cell Cycle": {
                    topic: "Topic 4.5: Cell Cycle",
                    lessons: [{ title: "Events of the Cell Cycle and Mitosis", objective: "Describe the events that occur in the cell cycle and explain how mitosis results in the transmission of chromosomes." }]
                },
                "Topic 4.6: Regulation of Cell Cycle": {
                    topic: "Topic 4.6: Regulation of Cell Cycle",
                    lessons: [{ title: "Regulation of the Cell Cycle", objective: "Describe the role of checkpoints in regulating the cell cycle and the effects of disruptions to the cell cycle." }]
                }
            }
        },
        "Unit 5: Heredity": {
            unit: "Unit 5: Heredity",
            topics: {
                "Topic 5.1: Meiosis": {
                    topic: "Topic 5.1: Meiosis",
                    lessons: [{ title: "Meiosis and Chromosome Transmission", objective: "Explain how meiosis results in the transmission of chromosomes from one generation to the next and describe the similarities and differences between mitosis and meiosis." }]
                },
                "Topic 5.2: Meiosis and Genetic Diversity": {
                    topic: "Topic 5.2: Meiosis and Genetic Diversity",
                    lessons: [{ title: "Generating Genetic Diversity", objective: "Explain how the process of meiosis generates genetic diversity." }]
                },
                "Topic 5.3: Mendelian Genetics": {
                    topic: "Topic 5.3: Mendelian Genetics",
                    lessons: [{ title: "Mendelian Inheritance", objective: "Explain the inheritance of genes and traits as described by Mendel’s laws." }]
                },
                "Topic 5.4: Non-Mendelian Genetics": {
                    topic: "Topic 5.4: Non-Mendelian Genetics",
                    lessons: [{ title: "Deviations from Mendelian Genetics", objective: "Explain deviations from Mendel’s model of the inheritance of traits." }]
                },
                "Topic 5.5: Environmental Effects on Phenotype": {
                    topic: "Topic 5.5: Environmental Effects on Phenotype",
                    lessons: [{ title: "Phenotypic Plasticity", objective: "Explain how the same genotype can result in multiple phenotypes under different environmental conditions." }]
                }
            }
        },
        "Unit 6: Gene Expression and Regulation": {
            unit: "Unit 6: Gene Expression and Regulation",
            topics: {
                "Topic 6.1: DNA and RNA Structure": {
                    topic: "Topic 6.1: DNA and RNA Structure",
                    lessons: [{ title: "Hereditary Information Storage", objective: "Describe the structures involved in passing hereditary information and the characteristics of DNA that allow it to be used as hereditary material." }]
                },
                "Topic 6.2: DNA Replication": {
                    topic: "Topic 6.2: DNA Replication",
                    lessons: [{ title: "DNA Replication Mechanisms", objective: "Describe the mechanisms by which genetic information is copied for transmission between generations." }]
                },
                "Topic 6.3: Transcription and RNA Processing": {
                    topic: "Topic 6.3: Transcription and RNA Processing",
                    lessons: [{ title: "Transcription and RNA Processing", objective: "Describe the mechanisms by which genetic information flows from DNA to RNA to protein." }]
                },
                "Topic 6.4: Translation": {
                    topic: "Topic 6.4: Translation",
                    lessons: [{ title: "Translation and Genotype-Phenotype Connection", objective: "Explain how the phenotype of an organism is determined by its genotype." }]
                },
                "Topic 6.5: Regulation of Gene Expression": {
                    topic: "Topic 6.5: Regulation of Gene Expression",
                    lessons: [{ title: "Mechanisms of Gene Regulation", objective: "Describe the types of interactions that regulate gene expression." }]
                },
                "Topic 6.6: Gene Expression and Cell Specialization": {
                    topic: "Topic 6.6: Gene Expression and Cell Specialization",
                    lessons: [{ title: "Transcription Factors and Cell Specialization", objective: "Explain how the binding of transcription factors to promoter regions affects gene expression and phenotypic differences." }]
                },
                "Topic 6.7: Mutations": {
                    topic: "Topic 6.7: Mutations",
                    lessons: [{ title: "Types of Mutations and Their Effects", objective: "Describe the various types of mutation and explain how changes in genotype may result in changes in phenotype." }]
                },
                "Topic 6.8: Biotechnology": {
                    topic: "Topic 6.8: Biotechnology",
                    lessons: [{ title: "Genetic Engineering Techniques", objective: "Explain the use of genetic engineering techniques in analyzing or manipulating DNA." }]
                }
            }
        },
        "Unit 7: Natural Selection": {
            unit: "Unit 7: Natural Selection",
            topics: {
                "Topic 7.1: Introduction to Natural Selection": {
                    topic: "Topic 7.1: Introduction to Natural Selection",
                    lessons: [{ title: "Causes and Effects of Natural Selection", objective: "Describe the causes of natural selection and explain how natural selection affects populations." }]
                },
                "Topic 7.2: Natural Selection": {
                    topic: "Topic 7.2: Natural Selection",
                    lessons: [{ title: "Phenotypic Variation and Fitness", objective: "Describe the importance of phenotypic variation in a population and explain its connection to fitness." }]
                },
                "Topic 7.3: Artificial Selection": {
                    topic: "Topic 7.3: Artificial Selection",
                    lessons: [{ title: "Human Impact on Diversity", objective: "Explain how humans can affect diversity within a population through artificial selection." }]
                },
                "Topic 7.4: Population Genetics": {
                    topic: "Topic 7.4: Population Genetics",
                    lessons: [{ title: "Random Processes in Evolution", objective: "Explain how random occurrences affect the genetic makeup of a population and describe the change in genetic makeup over time." }]
                },
                "Topic 7.5: Hardy-Weinberg Equilibrium": {
                    topic: "Topic 7.5: Hardy-Weinberg Equilibrium",
                    lessons: [{ title: "Conditions for Allele Frequency Change", objective: "Describe the conditions under which allele and genotype frequencies will change in populations." }]
                },
                "Topic 7.6: Evidence of Evolution": {
                    topic: "Topic 7.6: Evidence of Evolution",
                    lessons: [{ title: "Data-driven Evidence for Evolution", objective: "Describe the types of data that provide evidence for evolution and explain how they support the theory." }]
                },
                "Topic 7.7: Common Ancestry": {
                    topic: "Topic 7.7: Common Ancestry",
                    lessons: [{ title: "Evidence for Common Ancestry", objective: "Describe structural and functional evidence on cellular and molecular levels that provides evidence for the common ancestry of all eukaryotes." }]
                },
                "Topic 7.8: Continuing Evolution": {
                    topic: "Topic 7.8: Continuing Evolution",
                    lessons: [{ title: "Evolution as an Ongoing Process", objective: "Explain how evolution is an ongoing process in all living organisms." }]
                },
                "Topic 7.9: Phylogeny": {
                    topic: "Topic 7.9: Phylogeny",
                    lessons: [{ title: "Inferring Evolutionary Relationships", objective: "Describe the types of evidence that can be used to infer an evolutionary relationship and explain how to use phylogenetic trees and cladograms." }]
                },
                "Topic 7.10: Speciation": {
                    topic: "Topic 7.10: Speciation",
                    lessons: [{ title: "Mechanisms of Speciation", objective: "Describe the conditions under which new species may arise and explain the processes that drive speciation." }]
                },
                "Topic 7.11: Variations in Populations": {
                    topic: "Topic 7.11: Variations in Populations",
                    lessons: [{ title: "Genetic Diversity and Environmental Pressures", objective: "Explain how the genetic diversity of a species or population affects its ability to withstand environmental pressures." }]
                },
                "Topic 7.12: Origins of Life on Earth": {
                    topic: "Topic 7.12: Origins of Life on Earth",
                    lessons: [{ title: "Models of the Origin of Life", objective: "Describe the scientific evidence that supports models of the origin of life on Earth." }]
                }
            }
        },
        "Unit 8: Ecology": {
            unit: "Unit 8: Ecology",
            topics: {
                "Topic 8.1: Responses to the Environment": {
                    topic: "Topic 8.1: Responses to the Environment",
                    lessons: [{ title: "Organismal Responses to Environmental Change", objective: "Explain how the behavioral and physiological response of an organism is related to changes in internal or external environment." }]
                },
                "Topic 8.2: Energy Flow Through Ecosystems": {
                    topic: "Topic 8.2: Energy Flow Through Ecosystems",
                    lessons: [{ title: "Energy Acquisition, Flow, and Cycling", objective: "Describe the strategies organisms use to acquire and use energy and explain how energy flows and matter cycles through trophic levels." }]
                },
                "Topic 8.3: Population Ecology": {
                    topic: "Topic 8.3: Population Ecology",
                    lessons: [{ title: "Population Growth Dynamics", objective: "Describe factors that influence growth dynamics of populations." }]
                },
                "Topic 8.4: Effect of Density on Populations": {
                    topic: "Topic 8.4: Effect of Density on Populations",
                    lessons: [{ title: "Density-Dependent and Independent Factors", objective: "Explain how the density of a population affects and is determined by resource availability in the environment." }]
                },
                "Topic 8.5: Community Ecology": {
                    topic: "Topic 8.5: Community Ecology",
                    lessons: [{ title: "Community Structure and Interactions", objective: "Describe the structure of a community and explain how interactions within and among populations influence community structure." }]
                },
                "Topic 8.6: Biodiversity": {
                    topic: "Topic 8.6: Biodiversity",
                    lessons: [{ title: "Ecosystem Diversity and Resilience", objective: "Describe the relationship between ecosystem diversity and its resilience to changes in the environment." }]
                },
                "Topic 8.7: Disruptions to Ecosystems": {
                    topic: "Topic 8.7: Disruptions to Ecosystems",
                    lessons: [{ title: "Environmental Disruptions and Adaptations", objective: "Explain the interaction between the environment and random or preexisting variations in populations, and describe how invasive species, human activities, and geological/meteorological events affect ecosystems." }]
                }
            }
        }
    }
};
