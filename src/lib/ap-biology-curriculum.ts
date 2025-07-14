
import type { CurriculumContent } from './curriculum-data';

export const apBiologyCurriculum: CurriculumContent['AP Biology'] = {
    units: {
        "Unit 1: Chemistry of Life": {
            topics: {
                "Structure of Water and Hydrogen Bonding": { lessons: ["Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function."] },
                "Elements of Life": { lessons: ["Describe the composition of macromolecules required by living organisms."] },
                "Introduction to Macromolecules": { lessons: ["Describe the chemical reactions that build and break biological macromolecules."] },
                "Carbohydrates": { lessons: ["Describe the structure and function of carbohydrates."] },
                "Lipids": { lessons: ["Describe the structure and function of lipids."] },
                "Nucleic Acids": { lessons: ["Describe the structure and function of DNA and RNA."] },
                "Proteins": { lessons: ["Describe the structure and function of proteins."] }
            }
        },
        "Unit 2: Cell Structure and Function": {
            topics: {
                "Cell Structure and Function": { lessons: ["Explain how the structure and function of subcellular components and organelles contribute to the function of cells."] },
                "Cell Size": { lessons: ["Explain the effect of surface area-to-volume ratios on the exchange of materials between cells or organisms and the environment."] },
                "Plasma Membrane": { lessons: ["Describe the roles of each of the components of the cell membrane in maintaining the internal environment of the cell."] },
                "Membrane Permeability": { lessons: ["Explain how the structure of biological membranes influences selective permeability."] },
                "Membrane Transport": { lessons: ["Describe the mechanisms that organisms use to maintain solute and water balance and transport large molecules across the plasma membrane."] },
                "Facilitated Diffusion": { lessons: ["Explain how the structure of a molecule affects its ability to pass through the plasma membrane."] },
                "Tonicity and Osmoregulation": { lessons: ["Explain how concentration gradients affect the movement of molecules across membranes and how osmoregulatory mechanisms contribute to the health and survival of organisms."] },
                "Mechanisms of Transport": { lessons: ["Describe the processes that allow ions and other molecules to move across membranes."] },
                "Cell Compartmentalization": { lessons: ["Describe the membrane-bound structures of the eukaryotic cell and explain how they contribute to compartmentalization."] },
                "Origins of Cell Compartmentalization": { lessons: ["Describe similarities and/or differences in compartmentalization between prokaryotic and eukaryotic cells."] }
            }
        },
        "Unit 3: Cellular Energetics": {
            topics: {
                "Enzymes": { lessons: ["Explain how enzymes affect the rate of biological reactions."] },
                "Environmental Impacts on Enzyme Function": { lessons: ["Explain how changes to the structure of an enzyme may affect its function.", "Explain how the cellular environment affects enzyme activity."] },
                "Cellular Energy": { lessons: ["Describe the role of energy in living organisms.", "Explain how shared, conserved, and fundamental processes and features support the concept of common ancestry for all organisms."] },
                "Photosynthesis": { lessons: ["Describe the photosynthetic processes and structural features of the chloroplast that allow organisms to capture and store energy.", "Explain how cells capture energy from light and transfer it to biological molecules for storage and use."] },
                "Cellular Respiration": { lessons: ["Describe the processes and structural features of mitochondria that allow organisms to use energy stored in biological macromolecules.", "Explain how cells obtain energy from biological macromolecules in order to power cellular functions."] }
            }
        },
        "Unit 4: Cell Communication and Cell Cycle": {
            topics: {
                "Cell Communication": { lessons: ["Describe the ways that cells can communicate with one another.", "Explain how cells communicate with one another over short and long distances."] },
                "Introduction to Signal Transduction": { lessons: ["Describe the components of a signal transduction pathway.", "Describe the role of components of a signal transduction pathway in producing a cellular response."] },
                "Signal Transduction Pathways": { lessons: ["Describe the different types of cellular responses elicited by a signal transduction pathway.", "Explain how a change in the structure of any signaling molecule affects the activity of the signaling pathway."] },
                "Feedback": { lessons: ["Explain how positive and negative feedback helps maintain homeostasis."] },
                "Cell Cycle": { lessons: ["Describe the events that occur in the cell cycle.", "Explain how mitosis results in the transmission of chromosomes from one generation of cells to the next."] },
                "Regulation of Cell Cycle": { lessons: ["Describe the role of checkpoints in regulating the cell cycle.", "Describe the effects of disruptions to the cell cycle on the cell or organism."] }
            }
        },
        "Unit 5: Heredity": {
            topics: {
                "Meiosis": { lessons: ["Explain how meiosis results in the transmission of chromosomes from one generation to the next.", "Describe similarities and differences between the phases and outcomes of mitosis and meiosis."] },
                "Meiosis and Genetic Diversity": { lessons: ["Explain how the process of meiosis generates genetic diversity."] },
                "Mendelian Genetics": { lessons: ["Explain the inheritance of genes and traits as described by Mendel’s laws."] },
                "Non-Mendelian Genetics": { lessons: ["Explain deviations from Mendel’s model of the inheritance of traits."] },
                "Environmental Effects on Phenotype": { lessons: ["Explain how the same genotype can result in multiple phenotypes under different environmental conditions."] }
            }
        },
        "Unit 6: Gene Expression and Regulation": {
            topics: {
                "DNA and RNA Structure": { lessons: ["Describe the structures involved in passing hereditary information from one generation to the next.", "Describe the characteristics of DNA that allow it to be used as hereditary material."] },
                "DNA Replication": { lessons: ["Describe the mechanisms by which genetic information is copied for transmission between generations."] },
                "Transcription and RNA Processing": { lessons: ["Describe the mechanisms by which genetic information flows from DNA to RNA to protein."] },
                "Translation": { lessons: ["Explain how the phenotype of an organism is determined by its genotype."] },
                "Regulation of Gene Expression": { lessons: ["Describe the types of interactions that regulate gene expression.", "Explain how the location of regulatory sequences relates to their function."] },
                "Gene Expression and Cell Specialization": { lessons: ["Explain how the binding of transcription factors to promoter regions affects gene expression and the phenotype of the organism.", "Explain the connection between the regulation of gene expression and phenotypic differences in cells and organisms."] },
                "Mutations": { lessons: ["Describe the various types of mutation.", "Explain how changes in genotype may result in changes in phenotype.", "Explain how alterations in DNA sequences contribute to variation that can be subject to natural selection."] },
                "Biotechnology": { lessons: ["Explain the use of genetic engineering techniques in analyzing or manipulating DNA."] }
            }
        },
        "Unit 7: Natural Selection": {
            topics: {
                "Introduction to Natural Selection": { lessons: ["Describe the causes of natural selection.", "Explain how natural selection affects populations."] },
                "Natural Selection": { lessons: ["Describe the importance of phenotypic variation in a population.", "Explain how variation in molecules within cells connects to the fitness of an organism."] },
                "Artificial Selection": { lessons: ["Explain how humans can affect diversity within a population."] },
                "Population Genetics": { lessons: ["Explain how random occurrences affect the genetic makeup of a population.", "Describe the role of random processes in the evolution of specific populations.", "Describe the change in the genetic makeup of a population over time."] },
                "Hardy–Weinberg Equilibrium": { lessons: ["Describe the conditions under which allele and genotype frequencies will change in populations."] },
                "Evidence of Evolution": { lessons: ["Describe the types of data that provide evidence for evolution.", "Explain how morphological, biochemical, and geological data provide evidence that organisms have changed over time."] },
                "Common Ancestry": { lessons: ["Describe structural and functional evidence on cellular and molecular levels that provides evidence for the common ancestry of all eukaryotes."] },
                "Continuing Evolution": { lessons: ["Explain how evolution is an ongoing process in all living organisms."] },
                "Phylogeny": { lessons: ["Describe the types of evidence that can be used to infer an evolutionary relationship.", "Explain how phylogenetic trees and cladograms can be used to infer evolutionary relatedness."] },
                "Speciation": { lessons: ["Describe the conditions under which new species may arise.", "Describe the rate of evolution and speciation under different ecological conditions.", "Explain the processes and mechanisms that drive speciation."] },
                "Variations in Populations": { lessons: ["Explain how the genetic diversity of a species or population affects its ability to withstand environmental pressures."] },
                "Origins of Life on Earth": { lessons: ["Describe the scientific evidence that supports models of the origin of life on Earth."] }
            }
        },
        "Unit 8: Ecology": {
            topics: {
                "Responses to the Environment": { lessons: ["Explain how the behavioral and physiological response of an organism is related to changes in internal or external environment.", "Explain how the behavioral responses of organisms affect their overall fitness and may contribute to the success of a population."] },
                "Energy Flow Through Ecosystems": { lessons: ["Describe the strategies organisms use to acquire and use energy.", "Explain how energy flows and matter cycles through trophic levels.", "Explain how changes in energy availability affect populations, communities, and ecosystems.", "Explain how the activities of autotrophs and heterotrophs enable the flow of energy within an ecosystem."] },
                "Population Ecology": { lessons: ["Describe factors that influence growth dynamics of populations."] },
                "Effect of Density on Populations": { lessons: ["Explain how the density of a population affects and is determined by resource availability in the environment."] },
                "Community Ecology": { lessons: ["Describe the structure of a community according to its species composition and diversity.", "Explain how interactions within and among populations influence community structure."] },
                "Biodiversity": { lessons: ["Describe the relationship between ecosystem diversity and its resilience to changes in the environment.", "Explain how the addition or removal of any component of an ecosystem will affect its overall short-term and long-term structure."] },
                "Disruptions in Ecosystems": { lessons: ["Explain the interaction between the environment and random or preexisting variations in populations.", "Explain how invasive species affect ecosystem dynamics.", "Describe human activities that lead to changes in ecosystem structure and dynamics.", "Explain how geological and meteorological activity leads to changes in ecosystem structure and dynamics."] }
            }
        }
    }
};
