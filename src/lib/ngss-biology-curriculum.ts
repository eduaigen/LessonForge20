

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

export const ngssBiologyCurriculum: {
    units: {
      [unit: string]: Unit;
    };
} = {
    units: {
        "How do ecosystems work, and how can understanding them help us protect them?": {
            unit: "How do ecosystems work, and how can understanding them help us protect them?",
            topics: {
                "Ecosystem Components and Interactions": {
                    topic: "Ecosystem Components and Interactions",
                    lessons: [
                        { title: "Why do ecosystems need protection, and how are they protected?", objective: "Analyze conservation case studies to understand ecosystem dynamics." },
                        { title: "What can other cases of conservation help us understand about ecosystems and conservation?", objective: "Compare different conservation strategies and their effectiveness." },
                        { title: "Why do the animals in the Serengeti migrate?", objective: "Investigate the drivers of animal migration within an ecosystem." }
                    ]
                },
                "Conservation and Human Impact": {
                    topic: "Conservation and Human Impact",
                    lessons: [
                        { title: "How do humans interact with the Serengeti ecosystem?", objective: "Examine the various ways human activities impact the Serengeti." },
                        { title: "How do we evaluate if a conservation effort is working?", objective: "Develop criteria to assess the success of conservation projects." },
                        { title: "Can we use everything we have figured out about ecosystems and conservation to expand conservation to new lands and waters?", objective: "Apply ecosystem principles to propose new conservation initiatives." }
                    ]
                },
                "Limiting Factors and Carrying Capacity": {
                    topic: "Limiting Factors and Carrying Capacity",
                    lessons: [
                        { title: "How is food driving the wildebeest migration?", objective: "Analyze the relationship between food availability and wildebeest migration patterns." },
                        { title: "How does food affect the population size?", objective: "Investigate the concept of carrying capacity and limiting factors on population dynamics." },
                        { title: "Can we apply what we figured out about limiting factors and carrying capacity to a new scenario?", objective: "Apply knowledge of limiting factors to predict changes in a different ecosystem." }
                    ]
                },
                "Biodiversity and Ecosystem Resilience": {
                    topic: "Biodiversity and Ecosystem Resilience",
                    lessons: [
                        { title: "How do predators interact with the wildebeest migration?", objective: "Examine predator-prey dynamics within the context of the Serengeti migration." },
                        { title: "What other components of the Serengeti system interact with the migration?", objective: "Investigate the complex web of interactions within the Serengeti ecosystem." }
                    ]
                }
            }
        },
        "What causes fires in ecosystems to burn and how should we manage them?": {
            unit: "What causes fires in ecosystems to burn and how should we manage them?",
            topics: {
                "Energy and Matter in Fire Systems": {
                    topic: "Energy and Matter in Fire Systems",
                    lessons: [
                        { title: "How can fires burn under ice and release so much energy and matter?", objective: "Investigate the phenomenon of 'zombie fires' in the Arctic." },
                        { title: "What is peat and why does it burn so much?", objective: "Explore the properties of peat as a fuel source in ecosystems." },
                        { title: "How do zombie fires disrupt the flow of energy and cycle of matter in Arctic ecosystems?", objective: "Analyze the impact of zombie fires on Arctic ecosystem dynamics." }
                    ]
                },
                "Decomposition and Carbon Sinks": {
                    topic: "Decomposition and Carbon Sinks",
                    lessons: [
                        { title: "Why is there so much peat that has not decomposed in the permafrost?", objective: "Investigate the factors that inhibit decomposition in permafrost environments." },
                        { title: "How did so much plant energy and matter get into the peat in the zombie fire system?", objective: "Explore the process of peat formation and carbon sequestration." },
                        { title: "Could changes in the Earth's tilt cause more energy and matter to be stored in plants?", objective: "Analyze the relationship between Earth's orbital cycles and carbon storage." },
                        { title: "What is happening to carbon sinks in other ecosystems?", objective: "Examine the health and stability of various global carbon sinks." }
                    ]
                },
                "Global Carbon Cycling and Fires": {
                    topic: "Global Carbon Cycling and Fires",
                    lessons: [
                        { title: "Why should we be concerned that carbon sinks around the world are burning?", objective: "Assess the global implications of burning carbon sinks." },
                        { title: "What are the global effects of increased carbon dioxide from fires?", objective: "Analyze the impact of fire-related CO2 emissions on the global climate." }
                    ]
                },
                "Fire Management Solutions": {
                    topic: "Fire Management Solutions",
                    lessons: [
                        { title: "How can we help manage the matter and energy in fire systems?", objective: "Explore different strategies for managing fire-prone ecosystems." },
                        { title: "What decisions can we make to help manage fire in communities we care about?", objective: "Develop community-based fire management plans." },
                        { title: "Can we use everything we have figured out about fires to explain a new phenomenon?", objective: "Apply knowledge of fire ecology to a novel fire-related scenario." }
                    ]
                }
            }
        },
        "Who gets cancer and why? Where should we focus efforts on treatment and prevention?": {
            unit: "Who gets cancer and why? Where should we focus efforts on treatment and prevention?",
            topics: {
                "Cancer Incidence and Factors": {
                    topic: "Cancer Incidence and Factors",
                    lessons: [
                        { title: "Who gets cancer and why?", objective: "Analyze data on cancer incidence to identify patterns and risk factors." },
                        { title: "What is cancer?", objective: "Define cancer as a disease of uncontrolled cell division." }
                    ]
                },
                "Cell Division and Cancer Development": {
                    topic: "Cell Division and Cancer Development",
                    lessons: [
                        { title: "How do non-cancer cells become cancer cells?", objective: "Investigate the cellular mechanisms that lead to cancer development." },
                        { title: "Why are some kinds of cancer more common than others in older and taller people?", objective: "Explore the relationship between cell division, age, body size, and cancer risk." },
                        { title: "How do cancer cells end up with differences in their chromosomes and what is the role of p53 in preventing the differences?", objective: "Analyze the role of tumor suppressor genes like p53 in maintaining genomic stability." }
                    ]
                },
                "Genetic and Environmental Causes of Cancer": {
                    topic: "Genetic and Environmental Causes of Cancer",
                    lessons: [
                        { title: "How do we make p53, and why is it different sometimes?", objective: "Explore the processes of gene expression and mutation in the context of the p53 gene." },
                        { title: "What is the genetic basis of cancer?", objective: "Investigate the role of oncogenes and tumor suppressor genes in cancer." },
                        { title: "Why do some cancers appear to run in families?", objective: "Analyze patterns of hereditary cancer syndromes." },
                        { title: "How do genes interact with the environment to affect who gets cancer?", objective: "Explore the interplay of genetic and environmental factors in cancer development." },
                        { title: "Who gets cancer and why?", objective: "Synthesize knowledge of genetic and environmental factors to explain cancer incidence." }
                    ]
                },
                "Cancer Treatment and Prevention": {
                    topic: "Cancer Treatment and Prevention",
                    lessons: [
                        { title: "How do cancer treatments work?", objective: "Investigate various cancer treatment modalities and their mechanisms." },
                        { title: "What can we do to support people in our communities who have cancer?", objective: "Develop strategies for community-based cancer support and prevention." }
                    ]
                }
            }
        },
        "Natural Selection & Evolution of Populations": {
            unit: "Natural Selection & Evolution of Populations",
            topics: {
                "Urbanization and Nonhuman Populations": {
                    topic: "Urbanization and Nonhuman Populations",
                    lessons: [
                        { title: "What is the effect of increasing urbanization on nonhuman populations?", objective: "Analyze the impacts of urbanization on the evolution and behavior of various species." }
                    ]
                },
                "Selection Pressures and Trait Adaptation": {
                    topic: "Selection Pressures and Trait Adaptation",
                    lessons: [
                        { title: "Why does hawksbeard make fewer feathery seeds in cities?", objective: "Investigate how urban environments act as a selection pressure on plant dispersal mechanisms." },
                        { title: "Is poison a selection pressure?", objective: "Analyze the evolution of poison resistance in urban rat populations." },
                        { title: "What causes populations of city juncos to be bolder than mountain juncos?", objective: "Explore the evolution of behavioral traits in urban bird populations." },
                        { title: "How can we make sense of the way urbanization could have caused changes in hawksbeard, rat, and junco populations?", objective: "Synthesize case studies to develop a general model of urban evolution." },
                        { title: "Can we apply what we know about evolution by natural selection to another phenomenon?", objective: "Apply principles of natural selection to a novel urban evolution scenario." }
                    ]
                },
                "Genetic Diversity and Population Adaptation": {
                    topic: "Genetic Diversity and Population Adaptation",
                    lessons: [
                        { title: "What happens when nonhuman populations are harmed by urbanization and what can we do about it?", objective: "Investigate the consequences of habitat fragmentation and propose conservation solutions." },
                        { title: "How can fragmentation lead to lower genetic diversity?", objective: "Analyze the genetic effects of population isolation due to urbanization." }
                    ]
                },
                "Human-Engineered Solutions for Biodiversity": {
                    topic: "Human-Engineered Solutions for Biodiversity",
                    lessons: [
                        { title: "How can we plan urban areas to protect genetic diversity in nonhuman populations?", objective: "Design urban planning solutions that promote biodiversity and genetic connectivity." },
                        { title: "How can we use what we know about natural selection to design cities that support resilient populations and ecosystems?", objective: "Apply evolutionary principles to urban design for ecological sustainability." },
                        { title: "Can we apply what we know about natural selection and genetic diversity to a novel phenomenon?", objective: "Use knowledge of natural selection to address a novel urban conservation challenge." }
                    ]
                }
            }
        },
        "What will happen to Arctic bear populations as their environment changes?": {
            unit: "What will happen to Arctic bear populations as their environment changes?",
            topics: {
                "Arctic Bear Populations and Climate Change": {
                    topic: "Arctic Bear Populations and Climate Change",
                    lessons: [
                        { title: "How do changes in climate affect bear species coming together for the first time in the Arctic?", objective: "Analyze the impacts of climate change on the habitats and interactions of Arctic bear species." }
                    ]
                },
                "Bear Interactions and Adaptations": {
                    topic: "Bear Interactions and Adaptations",
                    lessons: [
                        { title: "How and why are bear species interacting and why might brown bears dominate?", objective: "Investigate interspecific competition and hybridization between bear species in the Arctic." }
                    ]
                },
                "Speciation and Common Ancestry": {
                    topic: "Speciation and Common Ancestry",
                    lessons: [
                        { title: "How similar/different are the polar, brown, and black bears?", objective: "Compare the genetic and morphological traits of different bear species." },
                        { title: "How did polar and brown bears become different species?", objective: "Explore the process of speciation using polar and brown bears as a case study." }
                    ]
                },
                "Extinction and Conservation Efforts": {
                    topic: "Extinction and Conservation Efforts",
                    lessons: [
                        { title: "What will happen to Arctic bear populations as their environment changes?", objective: "Predict the future of Arctic bear populations under different climate change scenarios." },
                        { title: "What will happen to bear species in the Arctic in the future?", objective: "Assess the long-term viability of bear species in a changing Arctic." },
                        { title: "How do past patterns of extinction help us understand possible consequences of extinctions now and in the future?", objective: "Use knowledge of past mass extinctions to inform current conservation strategies." },
                        { title: "What are our options for protecting species from extinction and should we implement them?", objective: "Evaluate different conservation strategies for protecting endangered species." },
                        { title: "Can we use everything we have figured out about speciation to explain a new phenomenon?", objective: "Apply principles of speciation and extinction to a novel conservation problem." }
                    ]
                }
            }
        }
    }
};
