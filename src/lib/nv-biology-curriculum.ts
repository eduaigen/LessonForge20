
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


export const nvBiologyCurriculum: {
    units: {
      [unit: string]: Unit;
    };
} = {
    units: {
        "Unit 1: The Marathon Runner": {
            unit: "Unit 1: The Marathon Runner",
            topics: {
                "Unit Opening": {
                    topic: "Unit Opening",
                    lessons: [
                        { title: "Lesson 1: Why would a marathon runner become disoriented during the race, then collapse afterward?", objective: "Students will watch a video, surface ideas, and develop an initial model for what could be happening to the human body during extended exercise." },
                        { title: "Lesson 2: Anchor phenomenon and Driving Question Board", objective: "Students will read texts to understand the story of a collapsed marathon runner, add to their initial model, and begin to generate ideas about what happened to her." },
                        { title: "Lesson 3: Driving Question Board and Performance Task", objective: "Students will add to their initial model and create a driving question board based on discussions." },
                    ]
                },
                "Gas Exchange and Cellular Respiration 5E": {
                    topic: "Gas Exchange and Cellular Respiration 5E",
                    lessons: [
                        { title: "Lesson 4 (Engage): Why do we breathe (ventilate) faster when exercising?", objective: "Students will share initial ideas about increased breathing during exercise, connecting to the marathon runner's breathing and oxygen." },
                        { title: "Lesson 5 (Explore 1): How do organisms generate energy for life processes?", objective: "Students will generate characteristics of a scientific model, understand the basic protocol for cellular respiration in yeast investigation, and learn about yeast." },
                        { title: "Lesson 6 (Explore 1 cont.): How do organisms generate energy for life processes?", objective: "Students will conduct an investigation on how sugar impacts cellular respiration in yeast to generate initial ideas on inputs and outputs of the process, and begin to understand how organisms generate energy." },
                        { title: "Lesson 7 (Explain 1): Developing an understanding of how cells generate ATP in the process of cellular respiration.", objective: "Students will use collected data and a text about cellular respiration in yeast to modify and refine a model that shows inputs and outputs in the system." },
                        { title: "Lesson 8 (Explore 2): How does the body regulate O2 levels in the blood?", objective: "Students will analyze secondary data on CO2 and O2 levels in the blood to surface the concept of dynamic equilibrium and the interaction of body systems in regulating oxygen levels." },
                        { title: "Lesson 9 (Explain 2): Using visual texts to construct an explanation of how interacting systems regulate gas exchange.", objective: "Students will partner-read a visual text to construct a sequence chart explaining how feedback mechanisms maintain homeostasis and regulate gas exchange." },
                        { title: "Lesson 10 (Elaborate): Extending conceptual understanding by applying their thinking to how different types of organisms regulate gas exchange.", objective: "Students will test ideas about gas exchange by applying their thinking to scenarios of gas exchange in other organisms (plants, amphibians, fish)." },
                        { title: "Lesson 11 (Evaluate): How does the regulation of gas exchange connect to changes we see during intense exercise?", objective: "Students will use their input/output model and understanding of cellular respiration and gas exchange to address the Marathon Runner problem, evaluating the relevance of new evidence like O2 saturation." },
                    ]
                },
                "Muscles and Energy 5E": {
                    topic: "Muscles and Energy 5E",
                    lessons: [
                        { title: "Lesson 12 (Engage): Why do our muscles become tired when exercising?", objective: "Students will notice and describe muscle fatigue after exercise, leading to investigation of energy acquisition, fatigue, and energy transport to muscles." },
                        { title: "Lesson 13 (Explore 1): How do muscle cells obtain the materials they need and get rid of waste products, so they can continue to do their work during exercise?", objective: "Students will gather data on exercise's impact on CO2 production, pulse rate, and breathing rate to surface how feedback mechanisms maintain homeostasis." },
                        { title: "Lesson 14 (Explore 1 cont.): How do muscle cells obtain the materials they need and get rid of waste products, so they can continue to do their work during exercise?", objective: "Students will gather data during an investigation on the impact of exercise on CO2 production, pulse rate, and breathing rate to surface how feedback mechanisms across multiple body systems maintain homeostasis during exercise." },
                        { title: "Lesson 15 (Explain 1): Developing an understanding of how muscle cells require the delivery of certain materials and the removal of waste products in order to function effectively during exercise.", objective: "Students will use data from investigations to develop an input-output model of cellular respiration in muscle cells, emphasizing energy release and predicting exercise's impact on muscles." },
                        { title: "Lesson 16 (Explore 2): How is the amount of glucose in the blood regulated, so that cells always get what they need to do respiration?", objective: "Students will conduct an investigation surfacing patterns of blood glucose regulation by feedback mechanisms." },
                        { title: "Lesson 17 (Explore 2 cont.): How is the amount of glucose in the blood regulated, so that cells always get what they need to do respiration?", objective: "Students will conduct an investigation surfacing patterns on how feedback mechanisms regulate blood glucose." },
                        { title: "Lesson 18 (Explain 2): Generating annotated graphs in order to explain how feedback mechanisms regulate blood glucose levels.", objective: "Students will work in pairs to generate annotated graphs representing feedback mechanisms, focusing on insulin's role in blood glucose regulation." },
                        { title: "Lesson 19 (Elaborate): Extending conceptual understanding by applying their thinking to how the body uses stored energy, in the form of fat, to fuel life activities.", objective: "Students will investigate the role of body fat and glycogen in maintaining homeostasis by analyzing a graph of a long-distance cyclist's blood glucose levels." },
                        { title: "Lesson 20 (Evaluate): How can we compare dynamic equilibrium in different body systems?", objective: "Students will compare graphs of O2 and blood glucose regulation to surface variability in tolerance range, applying this to the Marathon Runner phenomenon." },
                    ]
                },
                "Human Thermoregulation 5E": {
                    topic: "Human Thermoregulation 5E",
                    lessons: [
                        { title: "Lesson 21 (Engage): Why are humans able to withstand great temperature extremes?", objective: "Students will share initial ideas about how humans maintain stable body temperature and withstand temperature extremes, leading to investigation of thermoregulation." },
                        { title: "Lesson 22 (Explore): How do changes in external temperature affect internal body temperature?", objective: "Students will conduct an investigation on human regulatory mechanisms by collecting data on the impact of changing external temperatures on internal body temperature, figuring out humans have a complex system for maintaining body temperature." },
                        { title: "Lesson 23 (Explore cont.): How do changes in external temperature affect internal body temperature?", objective: "Students will conduct an investigation on human regulatory mechanisms by collecting data on the impact of changing external temperatures on internal body temperature, figuring out humans have a complex system for maintaining body temperature." },
                        { title: "Lesson 24 (Explain): How do humans maintain a dynamic equilibrium through thermoregulation?", objective: "Students will use a three-level guide to interpret a complex diagram of thermoregulation, then construct a scientific explanation of their collected data." },
                        { title: "Lesson 25 (Elaborate): Extending conceptual understanding by exploring a novel situation: Why is the human body cooled for heart surgery?", objective: "Students will test ideas about thermoregulation by applying their thinking to cooling the human body for heart surgery, providing an explanation using feedback systems understanding." },
                        { title: "Lesson 26 (Evaluate): How does the body thermoregulate during exercise?", objective: "Students will consider internal and external heat sources and demonstrate understanding of thermoregulation during exercise by evaluating body temperature data on the Marathon Runner problem." },
                    ]
                },
                "Water Balance 5E": {
                    topic: "Water Balance 5E",
                    lessons: [
                        { title: "Lesson 27 (Engage): Why do we get sweaty when we exercise? How does sweat help?", objective: "Students will share initial ideas about fluid intake during exercise (water vs. sports drink) to surface prior knowledge about osmoregulation." },
                        { title: "Lesson 28 (Explore): How does the body osmoregulate?", objective: "Students will conduct two investigations using scientific models to learn about osmoregulation: observing osmosis in onion cells and collecting data on kidney osmoregulation through a simulation." },
                        { title: "Lesson 29 (Explore cont.): How does the body osmoregulate?", objective: "Students will conduct two investigations, collecting data using scientific models, to learn about osmoregulation. Students generate observations on osmosis, using an onion cell; and collect data on osmoregulation in the kidney through an online simulation that allows students to manipulate water and solute concentrations in the blood." },
                        { title: "Lesson 30 (Explain): Developing an understanding of how the body osmoregulates during exercise.", objective: "Students will engage with text and visuals on osmoregulation and use feedback mechanisms understanding to construct a sequence chart explaining how the body adjusts to exercise changes." },
                        { title: "Lesson 31 (Elaborate): Extending conceptual understanding by applying their thinking to novel situations.", objective: "Students will test ideas about osmoregulation by investigating if goldfish can live in saltwater aquariums, evaluating models and proposing criteria for a model representing freshwater goldfish stability in saltwater." },
                        { title: "Lesson 32 (Evaluate): How does the body regulate water balance during exercise?", objective: "Students will demonstrate understanding of osmoregulation during exercise by evaluating plasma sodium level data on the Marathon Runner problem." },
                    ]
                },
                "Unit Closing": {
                    topic: "Unit Closing",
                    lessons: [
                        { title: "Lesson 33: Anchor Phenomenon, Driving Question Board and Performance Task", objective: "Students will return to the Driving Question Board to reflect on questions and generate a final explanatory model for why the marathon runner collapsed." },
                        { title: "Lesson 34: Performance Task (cont.)", objective: "Students will generate a final explanatory model representing why the marathon runner collapsed." },
                        { title: "Lesson 35: Unit Reflection", objective: "Students will reflect on their use of scientific modeling throughout the unit." },
                    ]
                }
            }
        },
        "Unit 2: Humans Vs. Bacteria": {
            unit: "Unit 2: Humans Vs. Bacteria",
            topics: {
                "Unit Opening": {
                    topic: "Unit Opening",
                    lessons: [
                        { title: "Lesson 1: Anchor Phenomenon", objective: "Students read text and data tables to tell the story of increasing and re-emerging infectious diseases globally after decades of decline." },
                        { title: "Lesson 2: Anchor Phenomenon", objective: "Students read text and data tables to tell the story of how infectious diseases are increasing and re-emerging after many decades of success in decreasing infectious disease globally." },
                        { title: "Lesson 3: Driving Question Board", objective: "Students create a driving question board based on ideas surfaced through discussion." },
                        { title: "Lesson 4: Performance Task", objective: "Students will develop an argument to support a claim on the best solution to deal with V. cholerae." },
                    ]
                },
                "The Black Death 5E": {
                    topic: "The Black Death 5E",
                    lessons: [
                        { title: "Lesson 5 (Engage): How did some people survive the Black Death?", objective: "Students are introduced to the historical events of the Black Death and share initial ideas about why some people survived the infection despite the catastrophic death toll." },
                        { title: "Lesson 6 (Explore 1): How do infectious diseases spread between people?", objective: "Students interact with simulation-generated data and apply probability concepts to investigate how different variables increase or impact disease transmission." },
                        { title: "Lesson 7 (Explore 1 Cont.): How do infectious diseases spread between people?", objective: "Students interact with simulation-generated data and apply concepts of probability to investigate how different variables increase or impact the rate of disease transmission." },
                        { title: "Lesson 8 (Explain 1): Why was the disease that caused The Black Death so deadly?", objective: "Students use a text and multimedia to evaluate claims on what caused such a high death toll during the Bubonic Plague." },
                        { title: "Lesson 9 (Explore 2): How does natural selection lead to beneficial traits in a population?", objective: "Students collect and analyze population-level data for rock pocket mice to surface how natural variation in traits may confer an advantage in specific environmental conditions." },
                        { title: "Lesson 10 (Explore 2 contd): How does natural selection lead to beneficial traits in a population?", objective: "Students collect and analyze population level data for rock pocket mice in order to surface how natural variation in traits may confer an advantage in specific environmental conditions." },
                        { title: "Lesson 11 (Explain 2): How could natural variations in the immune system of Medieval humans have contributed to their survival during the Black Death?", objective: "Students apply their understanding of natural selection to consider the claim that natural variations in human immune systems may have affected chances of survival during the Black Death, using sequence charts to represent causality." },
                        { title: "Lesson 12 (Elaborate): Extending conceptual understanding by applying their thinking to the evolution of the sickle cell trait.", objective: "Students test their ideas and conceptions about natural selection by considering how evolution works at different scales and in different population-level systems." },
                        { title: "Lesson 13 (Evaluate): How do the characteristics of transmission of disease and immunity connect to identifying the best solution to prevent a future cholera outbreak?", objective: "Students use evidence generated throughout the unit and their new understanding of disease transmission and innate immunity to evaluate claims on the best way to prevent a future cholera outbreak." },
                    ]
                },
                "Antibiotic Resistance 5E": {
                    topic: "Antibiotic Resistance 5E",
                    lessons: [
                        { title: "Lesson 14 (Engage): Why would bacteria never exposed to people be able to resist antibiotics that we use?", objective: "Students share initial ideas about why bacteria develop resistance without human medicine exposure, leading to investigation of antibiotic resistance evolution." },
                        { title: "Lesson 15 (Explore): How do bacteria become resistant to antibiotics?", objective: "Students collect data from a simulation to investigate how antibiotics affect trait distribution in bacterial populations, surfacing patterns related to antibiotic resistance." },
                        { title: "Lesson 16 (Explain): How do bacteria become resistant to antibiotics?", objective: "Students use a cause and effect graphic organizer to construct an explanation on how antibiotic resistance in bacteria develops at different scales." },
                        { title: "Lesson 17 (Elaborate): Extending conceptual understanding by exploring a novel situation: How can we leverage phages to fight antibiotic resistant infections?", objective: "Students test ideas about fighting bacterial infections by applying their thinking to phages, using text and understanding of bacterial infections and antibiotic resistance to explain how phages can fight infections." },
                        { title: "Lesson 18 (Evaluate): How does antibiotic resistance occur and how does this impact our ability to fight bacterial infections such as cholera?", objective: "Students evaluate a claim using their understanding of antibiotic resistance causes and natural selection in evolving populations." },
                    ]
                },
                "The Microbiome 5E": {
                    topic: "The Microbiome 5E",
                    lessons: [
                        { title: "Lesson 19 (Engage): Why would we be able to treat a bacterial infection by introducing more bacteria?", objective: "Students share initial ideas and questions about why doctors treat bacterial infections with fecal transplants, leading to investigation of bacteria-human co-evolution." },
                        { title: "Lesson 20 (Explore): How are microbiomes different across different populations of people?", objective: "Students engage with secondary data sets on human microbiomes to surface patterns on causes of health problems in unhealthy gut microbiomes." },
                        { title: "Lesson 21 (Explore Cont.): How are microbiomes different across different populations of people?", objective: "Students engage with secondary data sets on the microbiomes of different populations of people in order to surface patterns on causes of health problems in unhealthy gut microbiomes." },
                        { title: "Lesson 22 (Explain): How can we understand the differences between human microbiomes and the impact these differences may have on our health?", objective: "Students engage with complex visuals and text to understand microbiome variations across populations, considering common patterns across human microbiomes and ecosystems to explain how diversity supports ecosystem/microbiome health." },
                        { title: "Lesson 23 (Explain Cont.): How can we understand the differences between human microbiomes and the impact these differences may have on our health?", objective: "Students engage with complex visuals and a text to better understand variations in microbiomes across different populations of people. Students consider common patterns across human microbiomes and ecosystems to construct an explanation on how diversity supports ecosystem/microbiome health." },
                        { title: "Lesson 24 (Elaborate): Extending conceptual understanding by exploring a novel situation: Should we preemptively get a fecal transplant from people like the Hadza? What does the evidence say?", objective: "Students use evidence and scientific reasoning from investigations and text to evaluate a claim on whether fecal transplants can cause positive health outcomes." },
                        { title: "Lesson 25 (Evaluate): How does a healthy microbiome impact our ability to fight bacterial infections such as cholera?", objective: "Students evaluate a claim using their understanding of how an unhealthy or deficient microbiome can cause a more severe cholera infection." },
                    ]
                },
                "Cooperation and Survival 5E": {
                    topic: "Cooperation and Survival 5E",
                    lessons: [
                        { title: "Lesson 26 (Engage): Why do bacteria cooperate and generate biofilms?", objective: "Students are introduced to the phenomenon of bacteria banding together to form cooperative biofilms and share initial ideas about why bacteria would cooperate." },
                        { title: "Lesson 27 (Explore): Why is it advantageous for bacteria to cooperate? Do bacteria cheat when cooperating?", objective: "Students analyze and interpret data from a simulation to surface patterns on cooperative behaviors in bacteria." },
                        { title: "Lesson 28 (Explain): How did cooperation evolve, and how might we disrupt it in bacteria to fight infections?", objective: "Students construct an explanation on the evolution of cooperation in bacteria, then consider how humans might introduce environmental changes to alter cooperative behaviors to fight bacterial infections." },
                        { title: "Lesson 29 (Elaborate): Do other organisms demonstrate cooperative behaviors?", objective: "Students test ideas about cooperative behavior evolution by identifying evidence for causality in whale cooperative feeding behavior." },
                        { title: "Lesson 30 (Evaluate): How do the cooperative behaviors of bacteria connect to identifying the best solution to prevent a future cholera outbreak?", objective: "Students use evidence and new understanding of collaborative behaviors to evaluate claims on how to best prevent a future cholera outbreak." },
                    ]
                },
                "Unit Closing": {
                    topic: "Unit Closing",
                    lessons: [
                        { title: "Lesson 31: Anchor Phenomenon", objective: "Students generate ideas on why infectious diseases are increasing globally based on investigations and learning throughout the unit." },
                        { title: "Lesson 32: Driving Question Board", objective: "Students return to the Driving Question Board to reflect on questions generated throughout the unit." },
                        { title: "Lesson 33: Performance Task", objective: "Students generate a final scientific argument outlining the best solution for preventing a future cholera outbreak, based on investigations and learning." },
                        { title: "Lesson 34: Unit Reflection", objective: "Students reflect on their learning and use of scientific argumentation throughout the unit." },
                    ]
                }
            }
        },
        "Unit 3: Evolution of Sick Humans": {
            unit: "Unit 3: Evolution of Sick Humans",
            topics: {
                "Unit Opening": {
                    topic: "Unit Opening",
                    lessons: [
                        { title: "Lesson 1: Anchor Phenomenon: How have our environments and cultures changed over time? How have these changes impacted our health?", objective: "Students read a text to tell the story of a young girl who experiences digestive problems after eating a high-dairy NYC school lunch." },
                        { title: "Lesson 2: Anchor phenomenon and Driving Question Board", objective: "Students will create a driving question board based on ideas surfaced through student discussion." },
                    ]
                },
                "Lactase Persistence 5E": {
                    topic: "Lactase Persistence 5E",
                    lessons: [
                        { title: "Lesson 3 (Engage): Why are some people able to digest dairy into adulthood but others cannot?", objective: "Students ask questions after examining world maps of lactase persistence to surface ideas and questions about why some adults can digest dairy and others cannot." },
                        { title: "Lesson 4 (Explore 1): How do different groups of people digest dairy products? What happens to dairy in different people’s digestive systems?", objective: "Students surface questions after closely examining an enzyme structure and function model to better understand how specialized cells digest lactose." },
                        { title: "Lesson 5 (Explore 1 Cont’d): How do different groups of people digest dairy products? What happens to dairy in different people’s digestive systems?", objective: "Students surface questions after closely examining a model of enzyme structure and function in order to better understand how a system of specialized cells allows for the digestion of lactose." },
                        { title: "Lesson 6 (Explain 1): How does lactase help digest milk?", objective: "Students construct a scientific explanation of how the structure and function of lactase, produced in specialized small intestine cells, allows for lactose digestion." },
                        { title: "Lesson 7 (Explore 2): How can we investigate differences in DNA to better understand why some people have the ability to digest dairy?", objective: "Students consider DNA structure and function to develop a model explaining trait differences between individuals." },
                        { title: "Lesson 8 (Explain 2): How can we investigate differences in DNA to better understand why some people have the ability to digest dairy?", objective: "Through close examination of DNA structure and function, students construct a scientific explanation of how noncoding DNA portions may regulate genes like lactase, providing lactase persistence." },
                        { title: "Lesson 9 (Elaborate): Why do some populations have the ability to digest milk into adulthood but not others? Why would it be advantageous to be able to digest the milk of other animals?", objective: "Students engage with a video to explore how DNA structure and function lead to beneficial trait accumulation in a population." },
                        { title: "Lesson 10 (Evaluate): How do we help redesign a school to better serve our health?", objective: "Students generate a list of other mismatches based on their understanding of evolution and DNA structure/function, then generate questions to support school health design solutions." },
                    ]
                },
                "Leptin Resistance 5E": {
                    topic: "Leptin Resistance 5E",
                    lessons: [
                        { title: "Lesson 11 (Engage): Why is energy or fat storage advantageous?", objective: "Students ask questions based on a theory about why it might be advantageous for human babies to store excess fat." },
                        { title: "Lesson 12 (Explore 1): Why do some people store excess fat but others do not?", objective: "Students engage with research excerpts to communicate ideas on possible causal relationships between excessive fat storage, diet, and the protein leptin." },
                        { title: "Lesson 13 (Explain 1): What role does the hormone leptin play in regulating fat storage?", objective: "Students use a sequence chart to construct an explanation of how leptin resistance may be caused by various factors, including diet." },
                        { title: "Lesson 14 (Explore 2): What is the role of both genetics and environmental influences in developing leptin resistance?", objective: "Students engage with research excerpts to communicate ideas on the possible causal role genetics and the environment may play in excessive fat storage." },
                        { title: "Lesson 15 (Explain 2): How do genetic and environmental factors impact how leptin functions to regulate energy storage?", objective: "Students collaboratively generate a scientific explanation describing the relationship between genetics, environment, and leptin's function in regulating fat storage." },
                        { title: "Lesson 16 (Elaborate): What are other examples of resistance that inhibit important biological processes in the body?", objective: "Students consider how dietary factors impact insulin resistance development, using the lens of structure and function." },
                        { title: "Lesson 17 (Evaluate): How can we design a healthy school?", objective: "Students apply their understanding of leptin resistance causes to develop design solutions considering important constraints." },
                    ]
                },
                "Circadian Rhythms 5E": {
                    topic: "Circadian Rhythms 5E",
                    lessons: [
                        { title: "Lesson 18 (Engage): How can we investigate why most organisms display a day-night cycle?", objective: "Students investigate day-night cycles in plants and design a survey to collect data on environmental factors disrupting human day-night cycles." },
                        { title: "Lesson 19 (Explore): How can we investigate why most organisms display a day-night cycle?", objective: "Students investigate day-night cycles in plants and design a survey to collect data on which environmental factors may cause disruptions in human day-night cycles." },
                        { title: "Lesson 20 (Explain): How are day-night cycles regulated?", objective: "Students engage with multimedia resources to communicate scientific ideas on the causality between genetic and environmental factors and sleep-wake cycle regulation." },
                        { title: "Lesson 21 (Elaborate): How could we redesign our bedrooms to optimize our sleep?", objective: "Students apply their understanding of sleep regulation's molecular basis and bedroom component structure/function to design an optimized sleep bedroom." },
                        { title: "Lesson 22 (Evaluate): How can we design a healthy school?", objective: "Students apply their understanding of circadian rhythm disruption causes to develop design solutions that consider important constraints and tradeoffs." },
                    ]
                },
                "Common Ancestry 5E": {
                    topic: "Common Ancestry 5E",
                    lessons: [
                        { title: "Lesson 23 (Engage): Why are there so many examples of mismatch diseases?", objective: "Students surface initial ideas on why there are mismatches between our bodies and the current environment." },
                        { title: "Lesson 24 (Explore): How can we investigate genetic variations for important molecules across different species to better understand how traits evolve over time?", objective: "Students use the NCBI genetic database to analyze patterns in DNA sequences, comparing similarities and differences in important proteins across species." },
                        { title: "Lesson 25 (Explain): Why do we experience mismatch diseases, and why can’t we evolve quickly to solve them?", objective: "Students consider how patterns in the fossil record, embryology, and DNA sequences provide evidence for common ancestry to construct a scientific explanation of the evolutionary context for mismatch diseases." },
                        { title: "Lesson 26 (Elaborate): What other mismatch diseases are impacting society?", objective: "Students investigate additional diseases, looking for common ancestry patterns and conservation of important biological molecules to explain potential mismatch diseases." },
                        { title: "Lesson 27 (Evaluate): How can we design healthy schools?", objective: "Students apply their understanding of mismatch disease causes to develop and optimize design solutions that consider important constraints and tradeoffs." },
                    ]
                },
                "Unit Closing": {
                    topic: "Unit Closing",
                    lessons: [
                        { title: "Lesson 28: Anchor Phenomenon, Driving Question Board and Performance Task", objective: "Students will return to the Driving Question Board to react on questions generated throughout the unit." },
                        { title: "Lesson 29: Performance Task cont’", objective: "Students will generate a design solution that addresses mismatch concerns in the school environment." },
                        { title: "Lesson 30: Unit Reflection", objective: "Students reflect on their learning and use of a design process throughout the unit." },
                    ]
                }
            }
        },
        "Unit 4: Saving the Mountain Lion": {
            unit: "Unit 4: Saving the Mountain Lion",
            topics: {
                "Unit Opening": {
                    topic: "Unit Opening",
                    lessons: [
                        { title: "Lesson 1: Anchor Phenomenon: A mountain lion was hit by a car on a highway outside NYC. How did it get there, and what can this tell us about saving mountain lions?", objective: "Students read a text and watch a video to think about why the Connecticut mountain lion was so far from its home." },
                        { title: "Lesson 2: Anchor phenomenon and Driving Question Board", objective: "Students will ask questions about the Connecticut cat and generate a driving question board." },
                    ]
                },
                "Mountain Lion Population 5E": {
                    topic: "Mountain Lion Population 5E",
                    lessons: [
                        { title: "Lesson 3 (Engage): How can we figure out where the Connecticut Cat came from?", objective: "Students develop initial ideas about how to determine the Connecticut mountain lion's origin and create a table listing supporting evidence for each idea." },
                        { title: "Lesson 4 (Explore): How can we use genetic data to determine where the Connecticut Cat came from?", objective: "Students analyze patterns in genetic variation data from five North American mountain lion populations to determine the Connecticut cat's origin." },
                        { title: "Lesson 5 (Explain): Why would a mountain lion roam so far from his home territory?", objective: "Students incorporate mountain lion behavior descriptions with genetic data analysis to make and defend a claim about the Connecticut Cat’s movements." },
                        { title: "Lesson 6 (Elaborate): How can we apply what we’ve learned about mountain lions to another kind of big cat?", objective: "Students apply mountain lion knowledge to analyze cheetah population data, making and defending a claim on genetic variability and survival." },
                        { title: "Lesson 7 (Evaluate): How do changes in populations relate to genetic variation among individuals?", objective: "Students will develop an evidence-based model representing the cause of the Connecticut cat's migration at different scales." },
                    ]
                },
                "Sexual Reproduction 3E": {
                    topic: "Sexual Reproduction 3E",
                    lessons: [
                        { title: "Lesson 8 (Engage): Why are there a high number of strange traits in a small population of Florida mountain lions?", objective: "Students surface prior knowledge on mutations and sexual reproduction by examining an image and reading a brief text about a small Florida mountain lion population." },
                        { title: "Lesson 9 (Explore): How do mountain lions sexually reproduce?", objective: "Students use evidence-based models to closely examine the structure and function of the reproductive system." },
                        { title: "Lesson 10 (Explain): How do the abnormalities seen in the Florida mountain lions impact their ability to successfully reproduce?", objective: "Students use evidence-based models to understand how structural abnormalities may impact reproductive system functioning." },
                    ]
                },
                "Genetic Variation 5E": {
                    topic: "Genetic Variation 5E",
                    lessons: [
                        { title: "Lesson 11 (Engage): Why are there a high number of strange traits in a small population of Florida mountain lions?", objective: "Students surface prior knowledge on mutations and sexual reproduction after examining an image and reading a brief text about a small population of Florida mountain lions." },
                        { title: "Lesson 12 (Explore): How can we determine the genetic diversity of a population?", objective: "Students analyze and interpret genetic data to better understand a population's genetic diversity." },
                        { title: "Lesson 13 (Explain): How do abnormal traits increase in a population?", objective: "Students will make and defend a claim on the cause of abnormalities in a small Florida mountain lion population." },
                        { title: "Lesson 14 (Elaborate): Did toxins or other environmental factors cause the mutations leading to abnormalities in the Florida population of mountain lions?", objective: "Students engage with a text to consider the claim that the environment caused the abnormalities seen in the Florida mountain lion population." },
                        { title: "Lesson 15 (Evaluate): How do changes in populations relate to genetic variation among individuals?", objective: "Students develop a multi-scale, evidence-based model to represent the cause of disadvantageous traits in mountain lions." },
                    ]
                },
                "Engineering Gene Flow 5E": {
                    topic: "Engineering Gene Flow 5E",
                    lessons: [
                        { title: "Lesson 16 (Engage): How do you increase genetic diversity in small isolated populations?", objective: "Students generate solutions for increasing genetic diversity in the Florida panther population, connecting to their questions about the issue." },
                        { title: "Lesson 17 (Explore): What happened when additional individuals from an outside population were brought into the Florida mountain population?", objective: "Students analyze genetic data and engage with a simulation to surface how sexual reproduction between individuals can increase genetic variation at the population level." },
                        { title: "Lesson 18 (Explain): Did the introduction of mountain lions from Texas improve the likelihood that the Florida population will survive and reproduce in the future? Was it an effective solution?", objective: "Students make and defend a claim on whether introducing Texas mountain lions was an effective solution to increase genetic variation for the Florida population's future survival and reproduction." },
                        { title: "Lesson 19 (Elaborate): What other factors affect variation in gene expression?", objective: "Students make and defend a claim on how the environment can cause trait variation in turtles." },
                        { title: "Lesson 20 (Evaluate): Would the same solution that was used for addressing the low genetic diversity of the Florida panther population be effective in addressing low genetic diversity within other populations?", objective: "Students develop an evidence-based model representing the Connecticut cat's migration cause at different scales, then consider solutions to increase genetic variation in their own species." },
                    ]
                },
                "Unit Closing": {
                    topic: "Unit Closing",
                    lessons: [
                        { title: "Lesson 21: Anchor Phenomenon, Driving Question Board, and Performance Task", objective: "Students will return to the Driving Question Board to reflect on questions and develop a model explaining their chosen species' genetic diversity problem and a solution." },
                        { title: "Lesson 22: Performance Task (cont’d), Unit Reflection", objective: "Students reflect on their learning and use of modeling and patterns throughout the unit." },
                    ]
                }
            }
        },
        "Unit 5: Food for All": {
            unit: "Unit 5: Food for All",
            topics: {
                "Unit Opening": {
                    topic: "Unit Opening",
                    lessons: [
                        { title: "Lesson 1: Anchor Phenomenon: There was a mysterious pandemic spreading across the southern United States in the early 20th century. Why did some groups of people get sick, while others did not?", objective: "Students learn about a novel disease and ask questions about whether geography, income, microbes, and diet might be factors in causing the outbreak." },
                        { title: "Lesson 2: Driving Question Board", objective: "Students generate questions and create a driving question board based on ideas surfaced through discussion and reading from Lesson 1." },
                        { title: "Lesson 3: Performance Task", objective: "Students will construct an initial explanation of the cause behind the pellagra epidemic in pairs." },
                    ]
                },
                "Neolithic Revolution 3E": {
                    topic: "Neolithic Revolution 3E",
                    lessons: [
                        { title: "Lesson 4 (Engage): How can we analyze a graph of the human population over time?", objective: "Students analyze a graph to better understand how the human population has changed over time." },
                        { title: "Lesson 5 (Explore): How do limiting factors impact a population?", objective: "Students use a simulation to generate mathematical representations of mice populations under different environmental factors to surface the idea of carrying capacity." },
                        { title: "Lesson 6 (Explain): How did the Neolithic Revolution impact human populations?", objective: "Students use mathematical representations of carrying capacity to explain changes in the human population over time and at different scales." },
                    ]
                },
                "The Superfood that Changed the World 5E": {
                    topic: "The Superfood that Changed the World 5E",
                    lessons: [
                        { title: "Lesson 7 (Engage): Why did human populations increase exponentially as they developed the technology to grow crops like corn?", objective: "Students develop initial claims about what may have led humans to cultivate corn and other grains as primary food sources, connecting to earlier questions about cultivation and energy provision." },
                        { title: "Lesson 8 (Explore 1): How do plants, like corn, transform energy from sunlight into stored chemical energy?", objective: "Students use a model to illustrate how photosynthesis transforms light energy into stored chemical energy." },
                        { title: "Lesson 9 (Explain 1): How do plants, like corn, transform energy from sunlight into stored chemical energy?", objective: "Students use a model to illustrate how photosynthesis transforms light energy into stored chemical energy." },
                        { title: "Lesson 10 (Explore 2): Why was corn so useful to the early meso-americans and other societies? Why did corn allow civilizations to emerge and grow? How much energy does corn provide compared to other foods like meats and dairy?", objective: "Students develop a mathematical model of energy flow through the food chain system to gather evidence regarding whether corn provides more energy than other foods like meat and dairy." },
                        { title: "Lesson 11 (Explain 2): Why was corn so useful to the early meso-american societies and other societies?", objective: "Students use their mathematical model of energy flow through the food chain system to develop an explanation regarding whether corn provides more energy than other foods like meat and dairy." },
                        { title: "Lesson 12 (Elaborate): What staple crops do people eat around the world?", objective: "Students consider staple crops globally and in their communities, then use energy pyramid models to claim why these crops are efficient energy sources like corn." },
                        { title: "Lesson 13 (Evaluate): What have we figured out about whether corn played a role in the US pellagra epidemic that occurred in the early 1900s?", objective: "Students use models of efficient corn energy transfer to develop an initial explanation of corn's potential role in the pellagra epidemic." },
                    ]
                },
                "Infectious Agent or Insufficient Diet 5E": {
                    topic: "Infectious Agent or Insufficient Diet 5E",
                    lessons: [
                        { title: "Lesson 14 (Engage): How can we use evidence to support a hypothesis on the cause behind the pellagra epidemic?", objective: "Students will identify evidence to support an explanation of the pellagra epidemic." },
                        { title: "Lesson 15 (Explore 1): What evidence can we analyze to explain the cause of the pellagra epidemic?", objective: "Students use mathematical representations of historical data to explain the pellagra epidemic at individual and population levels." },
                        { title: "Lesson 16 (Explain 1): Why did a more diverse diet prevent pellagra?", objective: "Students use a text to respond to student-generated questions, developing an initial explanation of pellagra's cause in terms of energy and matter." },
                        { title: "Lesson 17 (Explore 2): Why do different foods decompose differently?", objective: "Students generate observations on food decomposition to surface how energy and matter move into and out of a system." },
                        { title: "Lesson 18 (Explain 2): How can the processing of food impact its nutrition and shelf-life?", objective: "Students construct and revise a scientific explanation of how corn processing to limit decomposition caused the pellagra epidemic." },
                        { title: "Lesson 19 (Elaborate): Why didn’t indigenous people, whose diet also relied heavily on corn, suffer from pellagra?", objective: "Students engage with a text and video on indigenous corn processing to revise their scientific explanation of pellagra's causes and why some groups avoided illness." },
                        { title: "Lesson 20 (Evaluate): How can our communities have access to fresh, unprocessed food?", objective: "Students revise their scientific explanation of why some populations suffered from pellagra, using the lens of energy and matter." },
                    ]
                },
                "Food for Plants 5E": {
                    topic: "Food for Plants 5E",
                    lessons: [
                        { title: "Lesson 21 (Engage): What communities were impacted most by the pellagra epidemic?", objective: "Students analyze pellagra rates by state and demographics, then generate questions about diverse diet access and agricultural practices among those most affected." },
                        { title: "Lesson 22 (Explore): Does growing cotton alone or all of any one crop damage the soil?", objective: "Students analyze niacin and amino acid molecular structures and soil composition data to explain how farming practices impact matter flow and plant growth." },
                        { title: "Lesson 23 (Explain): Why do differences in soil composition due to different farming practices impact the quantity and nutritional value of crops grown in those soils?", objective: "Students use evidence from resources to explain how land overexploitation through monocropping affects matter flow and plant growth, including niacin and amino acid formation." },
                        { title: "Lesson 24 (Elaborate): How did pellagra impact other communities?", objective: "Students engage with historical documents to revise their explanations of pellagra's systemic causes at different scales." },
                        { title: "Lesson 25 (Evaluate): How can we revise our explanations on the root causes behind the pellagra epidemic?", objective: "Students revise their scientific explanation of pellagra's causes, using the lens of energy and matter." },
                    ]
                },
                "Unit Closing": {
                    topic: "Unit Closing",
                    lessons: [
                        { title: "Lesson 26: Performance Task", objective: "Students will use what they learned about energy driving matter cycling through plants and the environment to explain how a local innovation addresses inequities in access to diverse nutritious diets." },
                        { title: "Lesson 27: Driving Question Board", objective: "Students return to the Driving Question Board to reflect on questions generated throughout the unit." },
                        { title: "Lesson 28: Unit Reflection", objective: "Students reflect on how their knowledge evolved throughout the unit and what caused it to evolve, focusing on evidence gathered from multiple sources to construct explanations." },
                    ]
                }
            }
        },
        "Unit 6: The Woolly Mammoth": {
            unit: "Unit 6: The Woolly Mammoth",
            topics: {
                "Unit Opening": {
                    topic: "Unit Opening",
                    lessons: [
                        { title: "Lesson 1: Anchor Phenomenon: What is the story of woolly mammoth extinction? What types of information do we need to know in order to evaluate the cause of a species’ extinction?", objective: "Students read a text, surface prior knowledge, and write the story of what happened to woolly mammoths." },
                        { title: "Lesson 2: Performance Task", objective: "Students develop an initial model to explain the cause of the woolly mammoth's extinction." },
                    ]
                },
                "Tuskless Elephants 5E": {
                    topic: "Tuskless Elephants 5E",
                    lessons: [
                        { title: "Lesson 3 (Engage): Why do some populations have a high number of tuskless elephants?", objective: "Students analyze a graph to surface ideas on how human activities, such as poaching, may impact biodiversity." },
                        { title: "Lesson 4 (Explore): Why is the trait of tusklessness increasing in some populations of female elephants?", objective: "Students use graphs and data sets of the tuskless elephant phenomenon to explore how human activities such as poaching impact biodiversity." },
                        { title: "Lesson 5 (Explain): How can we use what we understand about the tuskless elephant phenomenon to design solutions to human impacts on biodiversity?", objective: "Students apply their understanding of how elephant populations and habitats have changed to maintain stability after human impact, designing solutions to elephant decline." },
                        { title: "Lesson 6 (Elaborate): How can we design and test solutions to human impacts on biodiversity?", objective: "Students consider stakeholders while using and revising a simulation to collect and evaluate evidence on how a solution might reduce negative human actions on biodiversity." },
                        { title: "Lesson 7 (Evaluate): How might hunting by humans contributed to the extinction of the woolly mammoth?", objective: "Students use evidence from the learning sequence to inform the development of a model representing the causes behind the woolly mammoth's extinction." },
                    ]
                },
                "Coral Bleaching 5E": {
                    topic: "Coral Bleaching 5E",
                    lessons: [
                        { title: "Lesson 8 (Engage): How does human-induced climate change impact other organisms?", objective: "Students are presented with coral reef bleaching and use prior knowledge of human impact on biodiversity to predict causes of bleaching and decline." },
                        { title: "Lesson 9 (Explore 1): How can we understand the causes behind the bleaching and decline of coral reefs?", objective: "Students calculate and use mathematical representations of global heat stress data to surface trends on the relationship between rising sea temperatures and coral bleaching." },
                        { title: "Lesson 10 (Explain 1): Constructing an explanation for the cause behind coral bleaching.", objective: "Students develop an initial explanation of the effect of rising sea temperature on coral bleaching." },
                        { title: "Lesson 11 (Explore 2): How have human actions caused climate change?", objective: "Students collect data from a simulation to generate a mathematical representation of carbon movement through Earth's system to learn about human-caused climate change." },
                        { title: "Lesson 12 (Explain 2): How are human actions causing rapid climate change?", objective: "Students construct a model representing how human-induced climate change affects biodiversity at different scales, such as coral reef ecosystems." },
                        { title: "Lesson 13 (Elaborate): How can organisms adapt to climate change?", objective: "Students use evidence of climate change's impact on different organisms to explain how endangered organisms can adapt and avoid extinction." },
                        { title: "Lesson 14 (Evaluate): How might climate change have contributed to the extinction of the woolly mammoth?", objective: "Students revise initial ideas about woolly mammoth extinction causes and develop an extinction model using what they learned about climate change and human impact." },
                    ]
                },
                "Kelp Forest 5E": {
                    topic: "Kelp Forest 5E",
                    lessons: [
                        { title: "Lesson 15 (Engage): How can two very different ecosystems exist in the same geographic location at different points in time?", objective: "Students are introduced to kelp forests being replaced by urchin barrens and consider initial claims on ecosystem stability and how/why they change." },
                        { title: "Lesson 16 (Engage): Why do ecosystems change?", objective: "Students generate mathematical representations from data to support claims on the stability of two ecosystems." },
                        { title: "Lesson 17 (Explain): How do components of an ecosystem interact to maintain stability?", objective: "Students develop a multi-scale model to better understand complex interactions within an ecosystem that maintain stability." },
                        { title: "Lesson 18 (Elaborate): How can we evaluate arguments on ecosystem stability?", objective: "Students engage with text and media to evaluate arguments on biodiversity's role in maintaining ecosystem stability." },
                        { title: "Lesson 19 (Evaluate): How can we use our ideas on how ecosystems function and the role of biodiversity in maintaining stable ecosystems to explain what happened to the woolly mammoths?", objective: "Students use and develop a model to represent their new understanding of ecosystem resilience to revise initial claims about woolly mammoth extinction causes." },
                    ]
                },
                "Passenger Pigeon 5E": {
                    topic: "Passenger Pigeon 5E",
                    lessons: [
                        { title: "Lesson 20 (Engage): Why did the passenger pigeon go extinct?", objective: "Students read a historical description to ask questions and surface ideas about the human role in the passenger pigeon's extinction." },
                        { title: "Lesson 21 (Explore): What role did the passenger pigeon play in its habitat?", objective: "Students use historical descriptions to generate models representing the passenger pigeon's important role in maintaining its environment, understanding the impact of human-caused extinction." },
                        { title: "Lesson 22 (Explain): How can we evaluate an argument on the de-extinction of the passenger pigeon?", objective: "Students evaluate an argument to invest resources in bringing the passenger pigeon back from extinction as a solution to human-caused biodiversity loss and ecosystem disruption." },
                        { title: "Lesson 23 (Elaborate): How can understanding counterclaims help us evaluate an argument?", objective: "Students engage with an online text to evaluate a counterargument on using de-extinction as a solution to human-caused biodiversity loss." },
                        { title: "Lesson 24 (Evaluate): How can we evaluate an argument on bringing back the woolly mammoth as a solution to modern biodiversity loss and climate change?", objective: "Students evaluate an argument for woolly mammoth de-extinction by considering its unique role in maintaining its prehistoric ecosystem and its possible contributions to reducing human-caused climate change and biodiversity loss." },
                    ]
                },
                "Unit Closing": {
                    topic: "Unit Closing",
                    lessons: [
                        { title: "Lesson 25: Anchor Phenomenon", objective: "Students generate a model representing woolly mammoth extinction causes and evaluate the argument for de-extinction as a solution to human-caused biodiversity loss." }
                    ]
                }
            }
        }
    }
};
