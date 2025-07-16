
import type { CurriculumContent } from './curriculum-data';

export const earthScienceCurriculum: {
    units: {
      [unit: string]: {
        topics: {
          [topic: string]: {
            lessons: { title: string; objective: string }[];
          }
        };
      };
    };
} = {
    units: {
        "Unit 1: Discovering New Worlds": {
            topics: {
                "Unit Opening": {
                    lessons: [
                        { title: "Lesson 1: Launch Anchor Phenomenon", objective: "Out of all the planets in the solar system, Earth has life! Earth didn’t have life for a long time and now it does. What is it about Earth that makes it the only planet in our solar system that has sustained life?" },
                        { title: "Lesson 2: Define the Problem", objective: "For 12,000 years our Earth has been an ideal place for humans and other life to exist. Now rising global temperatures have caused sea-levels to rise, and an increase in floods and droughts, all forcing groups of people to leave their homes There is also a rapid decline in populations of species worldwide that many scientists are referring to as the “Sixth Mass Extinction.” Our Earth is becoming less and less welcoming due to human impact, and our population is continuing to increase! What are your initial ideas for what we can do to stop what is occurring to planet Earth and ensure the survival of humans and other species? What can humans do to survive as a species if we are not successful in stopping the negative changes to planet Earth?" },
                        { title: "Lesson 3: Introduce the Performance Task and Developing a Driving Question Board", objective: "A rise in global average temperatures is making Earth less and less habitable! Your task for this unit is to investigate what has made Earth the only planet in our solar system that can sustain life. After each investigation you will consider what you have learned and decide if and how you would like to revise your initial model from page 4 of your performance task organizer. Throughout the unit you will use your model to help you analyze and interpret data from stars and planets in other solar systems in order to write an argument from evidence about which exoplanet is most likely to be habitable. Good luck, the fate of the human species might depend on it! Based on their initial ideas for why planet Earth is the only planet in our solar system that has been habitable, students formulate a driving question board that will drive unit instruction." }
                    ]
                },
                "How the Sun Works 5E": {
                    lessons: [
                        { title: "Lesson 4: How the Sun Works 5E - Engage", objective: "How does the Sun Provide Energy? Connecting to their earlier questions about finding an exoplanet that has a star like our Sun and their ideas about how the Sun provides light and heat for life on Earth, students share their initial claim for how the Sun is able to release energy on a large scale and express a need to investigate the Sun further to figure out its composition and how it works." },
                        { title: "Lesson 5: How the Sun Works 5E - Explore", objective: "Investigating light from the Sun. Students use a simulator to figure out how a spectroscopy telescope works. They then analyze and interpret a data set (light spectra from the Sun and laboratory references of gas light spectra), looking for empirical evidence of patterns that either refutes or supports their initial claims." },
                        { title: "Lesson 6: How the Sun Works 5E - Explain", objective: "Developing a claim about the Sun’s composition. Using what they know about the behavior of light when it passes through different materials, students use patterns identified from empirical evidence in light spectra as evidence to support a claim about our Sun’s composition." },
                        { title: "Lesson 7: How the Sun Works 5E - Elaborate", objective: "Using additional evidence to construct a scientific explanation about the mechanism of energy released by the Sun. Students use the evidence related to scale (duration and quantity) of energy released by the Sun to construct a scientific explanation about the process that is releasing the energy received by Earth." },
                        { title: "Lesson 8: How the Sun Works 5E - Evaluate", objective: "Developing explanatory and predictive models of the Sun. Students revise and critique their models for why Earth has been such an ideal place for life to exist and evolve using empirical evidence of patterns in the Sun’s spectra and lab samples of elemental gasses and comparisons of scale (duration and quantity) of energy released by the Sun. Students use their model of our Sun to predict how the relative proportions of hydrogen to helium changes as the Sun ages and what that means for the future stages of our Sun." }
                    ]
                },
                "Star Life Cycles 5E": {
                    lessons: [
                        { title: "Lesson 9: Star Life Cycles 5E - Engage", objective: "What happens to stars over time? What will happen to our Sun in the future? Students observe a data visualization of a supernova and share their initial ideas about what caused the star to change and explode. Students then generate questions related to the stability of a star that is likely to support an Earth-like planet." },
                        { title: "Lesson 10: Star Life Cycles 5E - Explore 1", objective: "Observing Patterns of star stability and change over time. Students use a computational model of star life cycles to look for evidence of patterns in the relationship between star mass and stability and change in stars, so that they can identify stars with the longest and most stable lifespans." },
                        { title: "Lesson 11: Star Life Cycles 5E - Explore 2", objective: "Making connections between observable star properties and lifespan. Students develop and analyze a mathematical model (the Hertzsprung-Russell Diagram) to look for evidence of patterns in the relationships between observable star properties and lifespan." },
                        { title: "Lesson 12: Star Life Cycles 5E - Explain", objective: "Developing an explanatory model for patterns of stability and change observed in stars. Students use their understanding of nucleosynthesis and gravity in stars to develop an explanatory model for stability and change in star life cycles observed during the Explore phases." },
                        { title: "Lesson 13: Star Life Cycles 5E - Elaborate", objective: "Using a model of nucleosynthesis in stars in order to explain differences in stability and change in stars. Students collect data from a computational model of nucleosynthesis in stars in order to identify patterns in the relationship between mass of a star and nucleosynthesis. They use these patterns to explain why stability varies across stars of different mass, and why higher mass stars are able to produce heavier elements." },
                        { title: "Lesson 14: Star Life Cycles 5E - Evaluate", objective: "Constructing arguments for which star is most likely to support a planet that can sustain life. Students critique and revise their models for why Earth has been an ideal planet for sustaining life using evidence about star stability. They use evidence about how and why our Sun and other stars change or remain stable over time to argue about which star in the performance task data set is most likely to support an Earth-like planet." }
                    ]
                },
                "Planets and Orbits 5E": {
                    lessons: [
                        { title: "Lesson 15: Planets and Orbits 5E - Engage", objective: "Why does water on Comet Borrelly change from ice to vapor every 6 years? Students develop an initial solar system model to show how characteristics of orbits might explain the phenomenon of phase change during a comet’s revolution around the Sun and generate questions about what data they would like to investigate." },
                        { title: "Lesson 16: Planets and Orbits 5E - Explore 1", objective: "Identifying patterns in solar system data to test their initial models. Students are provided with orbital data from our solar system and graph it in order to identify evidence of patterns and test their explanatory models for phase change and stability of water on Comet Borrelly and other objects that orbit the Sun." },
                        { title: "Lesson 17: Planets and Orbits 5E - Explain 1", objective: "Revising solar system models. Students use the evidence of patterns identified in graphs they created to revise their solar system models that explain water’s phase change and stability on objects orbiting the Sun. They use their models to identify important features of the motions of orbiting objects that would allow a planet to maintain liquid water." },
                        { title: "Lesson 18: Planets and Orbits 5E - Explore 2", objective: "Developing a mathematical model for solar system orbits. Students use algebraic thinking to examine graphs from the Explore 1 in order to create a mathematical representation that allows them to identify the exact pattern in the relationship between orbital period and average distance between a planet/object and its star." },
                        { title: "Lesson 19: Planets and Orbits 5E - Explain 2", objective: "Using a mathematical representation to determine the orbit of exoplanets. Students use a mathematical equation representing the relationship between orbital semi major axis and orbital period (Kepler’s Third Law) to make predictions about exoplanets’ orbital semi major axis based on each exoplanet’s orbital period." },
                        { title: "Lesson 20: Planets and Orbits 5E - Elaborate", objective: "Constructing orbits of exoplanets to determine whether liquid water can exist on each planet. Students use a mathematical model (Kepler’s First Law) to describe the relationship between orbital eccentricity, major axis, and distance between foci of a planet/object revolving around its host star. Students then use the mathematical model and algebraic thinking to construct exoplanet orbits, allowing them to make predictions about which exoplanets stay within the habitable zone of their stars throughout an entire orbit." },
                        { title: "Lesson 21: Planets and Orbits 5E - Evaluate", objective: "Developing or revising models to include new ideas about orbits. Students develop new models or revise existing ones to represent the idea that stable temperatures and the maintenance of liquid water result from features of the motions of orbiting objects." }
                    ]
                },
                "Unit Closing": {
                    lessons: [
                        { title: "Lesson 22: Unit Closing - Complete the Performance Task", objective: "Based on their explanatory models for what has made Earth the only planet in our solar system that has been habitable, students argue from evidence about which exoplanet in the performance task data set is most likely to be habitable." }
                    ]
                }
            }
        },
        "Unit 2: Earthquakes, Volcanoes, and Tsunamis: Who's at Risk?": {
            topics: {
                "Unit Opening": {
                    lessons: [
                        { title: "Lesson 1: Unit Opening - Anchor Phenomenon", objective: "What locations on Earth are most at risk of loss of life and property caused by an earthquake, volcanic eruption, or tsunami in the near future? Why do earthquakes, volcanic eruptions, and tsunamis occur in some places on Earth, how are they related, and what does this all mean for risk in different parts of the world?" },
                        { title: "Lesson 2: Unit Opening - Performance Task", objective: "Students review the performance task for the unit, focusing on evaluating risk and proposing solutions." },
                        { title: "Lesson 3: Unit Opening - Driving Question Board", objective: "Based on ideas that have surfaced through student discussion and scientific modeling, students develop a driving question board that will drive investigations during the unit." }
                    ]
                },
                "Waves Inside the Earth 5E": {
                    lessons: [
                        { title: "Lesson 4: Waves Inside The Earth 5E - Engage", objective: "Where do earthquakes, tsunamis, and volcanic eruptions occur? Students use prior knowledge and empirical evidence of patterns in earthquakes, volcanic activity, and tsunamis to generate claims, ideas and questions about how these natural hazards occur." },
                        { title: "Lesson 5: Waves Inside The Earth 5E - Explore 1", objective: "How do we figure out what’s underneath the Earth’s surface? Students use models to collect empirical evidence of patterns associated with the movement of energy from earthquakes in the form of seismic waves, and begin to make inferences about Earth’s interior structure." },
                        { title: "Lesson 6: Waves Inside The Earth 5E - Explain 1", objective: "What do differences in seismic waves detected around the world tell us about Earth’s interior? Students use differences in the way that energy from earthquakes drive the movement of matter in the form of p and s-waves to develop a model of Earth’s interior structure that explains patterns of wave arrival at Earth’ surface." },
                        { title: "Lesson 7: Waves Inside The Earth 5E - Explore 2", objective: "What is the composition of Earth’s interior layers? What is the earth made of near the surface where these hazards occur? Students calculate the density of three liquids and make observations from a model in order to identify empirical evidence of patterns regarding relative density and sinking/rising." },
                        { title: "Lesson 8: Waves Inside The Earth 5E - Explain 2", objective: "How can we use what we know about density to figure out the composition of Earth’s interior layers? Students learn how structure of materials determines the property of density and how gravity affects materials of different densities to revise their models of Earth’s interior structure by adding the composition of Earth’s layers." },
                        { title: "Lesson 9: Waves Inside The Earth 5E - Elaborate 1", objective: "How do we know the earth’s outer core is liquid metal? Students evaluate additional evidence for the composition of Earth’s outer core using ideas about the structure and properties of liquid metal." },
                        { title: "Lesson 10: Waves Inside The Earth 5E - Elaborate 2", objective: "What is the ground like underneath where earthquakes, volcano eruptions and tsunamis occur? Students use a data visualization of earthquake properties (depth) to evaluate evidence for claims about the structure of plate boundaries underneath the Earth’s surface where earthquakes occur and begin to relate these structures to the frequency of earthquakes at different types of plate boundaries." },
                        { title: "Lesson 11: Waves Inside The Earth 5E - Evaluate", objective: "Who is most at risk? Students use what they learn about subsurface structure and composition from evidence of how energy from an earthquake drives the motion of matter in earth’s interior and calculate the rate at which earthquakes have occurred at the performance task locations in the past in order to revise and critique their models and arguments regarding risk." }
                    ]
                },
                "Surface Features and Plate Boundaries 5E": {
                    lessons: [
                        { title: "Lesson 12: Surface Features and Plate Boundaries 5E - Engage", objective: "What is happening at plate boundaries that causes earthquakes, volcanic eruptions and tsunamis? Students make observations of volcanic eruptions in Iceland and share their initial claims and questions regarding why we observe magma reaching Earth’s surface at such a tremendous rate in Iceland." },
                        { title: "Lesson 13: Surface Features and Plate Boundaries 5E - Explore 1", objective: "Why did earthquakes and volcanic eruptions occur in Iceland? Students analyze a graphical representation of seafloor rock at plate boundaries and identify empirical evidence of patterns in the age of rocks on the seafloor at different plate boundaries." },
                        { title: "Lesson 14: Surface Features and Plate Boundaries 5E - Explain 1", objective: "Why is so much magma reaching the surface along mid ocean ridges? Students evaluate evidence for the claim that new crust is produced at Earth’s divergent plate boundaries on the ocean floor and old crust is destroyed at subduction zones by reviewing empirical evidence of patterns and considering whether there are processes supported by science ideas that can connect the evidence to the claim." },
                        { title: "Lesson 15: Surface Features and Plate Boundaries 5E - Explore 2", objective: "Does the theory of plate tectonics explain the occurrence of earthquakes, volcanic eruptions? Students use models to observe the rate of change associated with the occurrence of earthquakes and volcanic eruptions, and the formation of other surface features." },
                        { title: "Lesson 16: Surface Features and Plate Boundaries 5E - Explain 2", objective: "Students develop a model based on evidence that explains how plate interactions lead to the formation of surface features and natural hazards on different time scales, due to the time scale of processes that lead to their formation or occurrence." },
                        { title: "Lesson 17: Surface Features and Plate Boundaries 5E - Elaborate", objective: "What’s the age of continental rock? Students analyze age of rock data and model to evaluate whether plate tectonics can explain the imperial evidence of patterns observed in the age continental rocks." },
                        { title: "Lesson 18: Surface Features and Plate Boundaries 5E - Evaluate", objective: "Who’s at risk? Students use what they have learned about how earthquakes, volcanic eruptions, and tsunamis occur at plate boundaries and calculate the rate at which volcanic eruptions and tsunamis have occurred at the performance task locations in the past in order to revise and critique their models and arguments regarding risk." }
                    ]
                },
                "Energy Transfer 5E": {
                    lessons: [
                        { title: "Lesson 19: Energy Transfer 5E - Engage", objective: "What is happening inside Earth that drives plate motion? Students use what they know about Earth’s interior to make initial claims about the source of energy that drives plate motion and how it reaches Earth’s surface." },
                        { title: "Lesson 20: Energy Transfer 5E - Explore", objective: "How do differences in temperature affect matter inside the Earth lead to the movement of matter caused by the Tonga volcanic eruption? Students develop and use a physical model that presents analog behavior for processes within Earth’s interior in order to collect empirical evidence of patterns in movement of matter and energy." },
                        { title: "Lesson 21: Energy Transfer 5E - Explain", objective: "Developing an explanatory model for the movement of matter caused by the Tonga volcanic eruption. Students develop an explanatory model for how energy inside the Earth drives the motion of tectonic plates on Earth’s surface." },
                        { title: "Lesson 22: Energy Transfer 5E - Elaborate", objective: "What is the source of such tremendous amounts of energy? Students evaluate evidence for potential sources of energy in Earth’s interior in order to revise their models and include how and where energy that drives the movement of matter from Earth’s interior to Earth’s surface is produced." },
                        { title: "Lesson 23: Energy Transfer 5E - Evaluate", objective: "Students use what they learn about energy and matter flows from Earth’s interior to Earth’s surface, and tectonic hazard vulnerability profiles for each performance task location to revise and critique their models and arguments regarding risk." }
                    ]
                }
            }
        },
        "Unit 3: Climate Change Throughout Human History": {
            topics: {
                "Unit Opening": {
                    lessons: [
                        { title: "Lesson 1: Anchor Phenomenon - Launch", objective: "How do natural factors contribute to changes in Earth’s temperature? What are 97% of climate scientists seeing in the data that makes them so sure humans are the cause of climate change today?" },
                        { title: "Lesson 2: Anchor Phenomenon - Telling the Story", objective: "How do natural factors contribute to changes in Earth’s temperature? What are 97% of climate scientists seeing in the data that makes them so sure humans are the cause of climate change today?" },
                        { title: "Lesson 3: Anchor Phenomenon - Reviewing the Performance Task", objective: "How do we help our community understand the climate crisis and what they can do to contribute to equitable solutions?" },
                        { title: "Lesson 4: Anchor Phenomenon - Surfacing Student Ideas", objective: "Students review the Performance Task." },
                        { title: "Lesson 5: Anchor Phenomenon - Driving Question Board", objective: "What questions do we have? What data do we need to figure out the answers to these questions?" }
                    ]
                },
                "Earth-Sun Dynamics 5E": {
                    lessons: [
                        { title: "Lesson 6: Earth-Sun Dynamics - Engage", objective: "How has the amount of radiation (sunlight) reaching Earth varied in the past?" },
                        { title: "Lesson 7: Earth-Sun Dynamics - Explore", objective: "How does Earth’s position affect the amount of radiation reaching Earth’s surface?" },
                        { title: "Lesson 8: Earth-Sun Dynamics - Explain 1", objective: "Did changes in Earth’s position cause the patterns of radiation reaching Earth’s surface and glacial-interglacial cycles?" },
                        { title: "Lesson 9: Earth-Sun Dynamics - Explain 2", objective: "How strong is the causal relationship between Milankovitch Cycles and glacial-interglacial cycles?" },
                        { title: "Lesson 10: Earth-Sun Dynamics - Elaborate", objective: "Has the amount of radiation emitted from the Sun changed over time? Has it been a factor contributing to climate change events in the past?" },
                        { title: "Lesson 11: Earth-Sun Dynamics - Evaluate", objective: "What does what we have learned tell us about climate change today and in the future?" }
                    ]
                },
                "Ice Caps & Oceans 5E": {
                    lessons: [
                        { title: "Lesson 12: Ice Caps & Oceans - Engage", objective: "What happens when ice sheets melt or freeze?" },
                        { title: "Lesson 13: Ice Caps & Oceans - Explore 1", objective: "How do different surfaces interact with radiation from the Sun?" },
                        { title: "Lesson 14: Ice Caps & Oceans - Explain 1", objective: "Why is the arctic warming at almost 4 times the rate as the rest of the planet?" },
                        { title: "Lesson 15: Ice Caps & Oceans - Explore 2", objective: "What impact does melting or freezing ice have on ocean currents?" },
                        { title: "Lesson 16: Ice Caps & Oceans - Explain 2", objective: "How do changing ocean currents impact Earth’s climate system?" },
                        { title: "Lesson 17: Ice Caps & Oceans - Elaborate", objective: "Are there changes in other ocean currents that can affect climate?" },
                        { title: "Lesson 18: Ice Caps & Oceans - Evaluate", objective: "What does what we have learned tell us about climate change today and in the future?" }
                    ]
                },
                "Greenhouse Gasses 5E": {
                    lessons: [
                        { title: "Lesson 19: Greenhouse Gases - Engage", objective: "What were atmospheric carbon dioxide levels during past climate change events?" },
                        { title: "Lesson 20: Greenhouse Gasses - Explore 1", objective: "What natural factors cause carbon dioxide from the atmosphere to increase and decrease?" },
                        { title: "Lesson 21: Greenhouse Gasses - Explain 1", objective: "What was happening with greenhouse gases during and after the Younger Dryas?" },
                        { title: "Lesson 22: Greenhouse Gasses - Explain 2", objective: "How did climate stability after the Holocene Optimum Warming impact human populations?" },
                        { title: "Lesson 23: Greenhouse Gasses - Elaborate", objective: "What is the evidence and mechanistic account for human caused climate change today?" },
                        { title: "Lesson 24: Greenhouse Gases - Evaluate", objective: "How do we know that carbon dioxide emitted into the atmosphere by humans is causing global temperature increases today?" }
                    ]
                }
            }
        },
        "Unit 4: More Hurricanes and Blizzards in NYC?": {
            topics: {
                "Unit Opening": {
                    lessons: [
                        { title: "Lesson 1: Unit Opening - Anchor Phenomenon", objective: "It felt like hurricanes and blizzards were really bad this past year. What does the data show? Will this continue?" },
                        { title: "Lesson 2: Unit Opening - Introduce the Performance Task and Driving Question Board", objective: "Will there be more frequent and more intense severe storms in the future?" },
                        { title: "Lesson 3: Unit Opening - Complete the Performance Task", objective: "Will there be more frequent and more intense severe storms in the future?" }
                    ]
                },
                "Atmosphere and Weather Variables 3E (Optional)": {
                    lessons: [
                        { title: "Lesson 4: Atmosphere and Weather Variables 3E - Engage", objective: "What do students know about the atmosphere and its properties?" },
                        { title: "Lesson 5: Atmosphere and Weather Variables 3E - Explore", objective: "Students use the Selected Properties of Earth’s Atmosphere ESRT and simulators to investigate properties of the atmosphere" },
                        { title: "Lesson 6: Atmosphere and Weather Variables 3E - Explain", objective: "Students explain properties of the atmosphere" }
                    ]
                },
                "Blizzards 5E": {
                    lessons: [
                        { title: "Lesson 7: Blizzards 5E - Engage", objective: "What do students know about wind, rain, and snow, and how they occur?" },
                        { title: "Lesson 8: Blizzards 5E - Explore 1", objective: "Students investigate wind formation through a variety of models." },
                        { title: "Lesson 9: Blizzards 5E - Explain 1", objective: "Students develop explanations for how wind from blizzards like Winter Storm Jonas occurs." },
                        { title: "Lesson 10: Blizzards 5E - Explore 2", objective: "Students investigate precipitation formation through models." },
                        { title: "Lesson 11: Blizzards 5E - Explain 2", objective: "Students develop explanations for how snow from blizzards like Winter Storm Jonas occurs." },
                        { title: "Lesson 12: Blizzards 5E - Elaborate", objective: "Students analyze weather maps to identify weather systems and develop a model to explain their formation." },
                        { title: "Lesson 13: Blizzards 5E - Evaluate", objective: "Students connect their learning to the Performance Task" }
                    ]
                },
                "The Paths of Severe Storms 5E": {
                    lessons: [
                        { title: "Lesson 14: The Paths of Severe Storms 5E - Engage", objective: "What do students know about why we see patterns in the location blizzards and hurricanes form and in their trajectories?" },
                        { title: "Lesson 15: The Paths of Severe Storms 5E - Explore 1", objective: "Students explore air surface temperature and intensity of solar insolation." },
                        { title: "Lesson 16: The Paths of Severe Storms 5E - Explain 1", objective: "Students identify and explain where different air masses originate." },
                        { title: "Lesson 17: The Paths of Severe Storms 5E - Explore 2", objective: "Students investigate global movement of air." },
                        { title: "Lesson 18: The Paths of Severe Storms 5E - Explain 2", objective: "Students explain patterns of global wind and precipitation." },
                        { title: "Lesson 19: The Paths of Severe Storms 5E - Elaborate", objective: "Students apply their learning about global winds to explain and make predictions about storm trajectory" },
                        { title: "Lesson 20: The Paths of Severe Storms 5E - Evaluate", objective: "How does this connect to the Performance Task?" }
                    ]
                },
                "Hurricanes 5E": {
                    lessons: [
                        { title: "Lesson 21: Hurricanes 5E - Engage", objective: "What do students know about hurricanes?" },
                        { title: "Lesson 22: Hurricanes 5E - Explore", objective: "Students look for patterns in location and time of year of hurricane occurrence." },
                        { title: "Lesson 23: Hurricanes 5E - Explain", objective: "Students explain patterns of hurricane location and seasons" },
                        { title: "Lesson 24: Hurricanes 5E - Elaborate", objective: "Students use models to explain why hurricanes spin." },
                        { title: "Lesson 25: Hurricanes 5E - Evaluate", objective: "Students connect their learning to the Performance Task" }
                    ]
                }
            }
        },
        "Unit 5: Solutions for a Sustainable Future": {
            topics: {
                "Unit Opening": {
                    lessons: [
                        { title: "Lesson 1: Unit Opening - Anchor Phenomenon", objective: "How is human activity harming the health of humans and the natural environment? How is the health of humans and the natural environment intertwined? What solutions adequately address these problems and can be implemented in the real world?" },
                        { title: "Lesson 2: Unit Opening - Performance Task", objective: "How is human activity harming the health of humans and the natural environment? How is the health of humans and the natural environment intertwined? What solutions adequately address these problems and can be implemented in the real world?" },
                        { title: "Lesson 3: Unit Opening - Driving Question Board", objective: "What questions do we have? What data do we need to figure out the answers to these questions?" }
                    ]
                },
                "Burning Fossil Fuels 5E": {
                    lessons: [
                        { title: "Lesson 4: Fossil Fuels 5E - Engage", objective: "How does burning fossil fuel contribute to environmental causes of death around the world?" },
                        { title: "Lesson 5: Fossil Fuels 5E - Explore 1", objective: "Why does air pollution from fossil fuels cause more deaths in the United States than in France?" },
                        { title: "Lesson 6: Fossil Fuels 5E - Explain 1", objective: "How can we apply solutions used in France to the United States in order to reduce deaths?" },
                        { title: "Lesson 7: Fossil Fuels 5E - Explore 2", objective: "How does carbon mediate interactions between different global systems, and how do human activities modify those interactions?" },
                        { title: "Lesson 8: Fossil Fuels 5E - Explain 2", objective: "How do the ways that burning fossil fuels impacts natural systems combine to impact human health?" },
                        { title: "Lesson 9: Fossil Fuels 5E - Elaborate", objective: "How can we design and refine solutions to reduce the impacts of human activities on natural systems?" },
                        { title: "Lesson 10: Fossil Fuels 5E - Evaluate", objective: "How can we reduce the number of deaths from pollution generated by burning fossil fuels?" }
                    ]
                },
                "Land Use & Biodiversity 5E": {
                    lessons: [
                        { title: "Lesson 11: Land Use and Biodiversity 5E - Engage", objective: "How is the heat impacting the health of New Yorkers?" },
                        { title: "Lesson 12: Land Use and Biodiversity 5E - Explore", objective: "How has the change in land use in New York City over the past 400 years contributed to the heat island effect?" },
                        { title: "Lesson 13: Land Use and Biodiversity 5E - Explain 1", objective: "How does land use in New York City contribute to heat-related deaths?" },
                        { title: "Lesson 14: Land Use and Biodiversity 5E - Explain 2", objective: "How can we intervene to increase the sustainability of cities?" },
                        { title: "Lesson 15: Land Use and Biodiversity 5E - Elaborate", objective: "How are humans changing land in other areas in unsustainable ways with negative impacts to human and ecosystem health?" },
                        { title: "Lesson 16: Land Use and Biodiversity 5E - Evaluate", objective: "How can green roofs contribute to sustainability, and how do these solutions combine to heat deaths globally?" }
                    ]
                },
                "Mining 5E": {
                    lessons: [
                        { title: "Lesson 17: Mining 5E - Engage", objective: "Why are lung disease, heart disease, and cancer unequally distributed in the United States?" },
                        { title: "Lesson 18: Mining 5E - Explore 1", objective: "How does coal mining contribute to loss of biodiversity?" },
                        { title: "Lesson 19: Mining 5E - Explain 1", objective: "How does coal mining cause health impacts to nearby communities?" },
                        { title: "Lesson 20: Mining 5E - Explore 2 (Optional)", objective: "Is mining done in NYS, and how do we know if we have found a valuable mineral?" },
                        { title: "Lesson 21: Mining 5E - Explain 2 (Optional)", objective: "How does NYS balance costs and benefits to keep mining sustainable?" },
                        { title: "Lesson 22: Mining 5E - Elaborate", objective: "How can we evaluate solutions to minimize environmental causes of death in mining and other communities?" },
                        { title: "Lesson 23: Mining 5E - Evaluate", objective: "How can we argue in favor of solutions that minimize environmental causes of death in mining and other communities?" }
                    ]
                },
                "Unit Closing": {
                    lessons: [
                        { title: "Lesson 24: Unit Closing - Anchor Phenomenon", objective: "Around the world, the health of humans and the natural environment is suffering negative consequences of human activity." },
                        { title: "Lesson 25: Unit Closing - Driving Question Board", objective: "How is human activity harming the health of humans and the natural environment? How is the health of humans and the natural environment intertwined? What solutions adequately address these problems and can be implemented in the real world?" },
                        { title: "Lesson 26: Unit Closing - Performance Task", objective: "How do the different solutions students’ evaluated contribute to reducing the overall impact of human activities on the environment and environmentally caused diseases?" }
                    ]
                }
            }
        },
        "Unit 6: Probability of Life Elsewhere": {
            topics: {
                "Unit Opening": {
                    lessons: [
                        { title: "Lesson 1: Unit Opening - Anchor Phenomenon", objective: "Does life exist somewhere outside of Earth? What about intelligent life?" },
                        { title: "Lesson 2: Unit Opening - Performance Task", objective: "Students review the performance task and develop an initial model." },
                        { title: "Lesson 3: Unit Opening - Driving Question Board", objective: "Students develop their own questions to investigate throughout the unit." }
                    ]
                },
                "Stability of the Solar System 5E": {
                    lessons: [
                        { title: "Lesson 4: Stability of the Solar System 5E - Engage", objective: "How often have asteroids struck Earth? Can asteroid impacts explain why it took so long for intelligent life to evolve on Earth?" },
                        { title: "Lesson 5: Stability of the Solar System 5E - Explore 1", objective: "What can the composition and age of rocks from objects in the solar system tell us about its past?" },
                        { title: "Lesson 6: Stability of the Solar System 5E - Explain 1", objective: "What explains the tremendous difference in the number of craters on the Moon, Mars, and Earth?" },
                        { title: "Lesson 7: Stability of the Solar System 5E - Explore 2", objective: "How do the properties of water affect the persistence of impact craters on Earth?" },
                        { title: "Lesson 8: Stability of the Solar System 5E - Explain 2", objective: "What explains the tremendous difference in the number of craters on the Moon, Mars, and Earth?" },
                        { title: "Lesson 9: Stability of the Solar System 5E - Elaborate", objective: "How has the Rock Cycle Impacted the Stability of Craters on Earth?" },
                        { title: "Lesson 10: Stability of the Solar System 5E - Evaluate", objective: "How might asteroid collisions affect the probability of life evolving?" }
                    ]
                },
                "Coevolution of Earth and Life 5E": {
                    lessons: [
                        { title: "Lesson 11: Coevolution of Earth and Life 5E - Engage", objective: "How has the pace of evolution changed over the past 4 billion years?" },
                        { title: "Lesson 12: Coevolution of Earth and Life 5E - Explore", objective: "What can the fossil record tell us about the evolution of living things and Earth’s systems over the past 4 billion years?" },
                        { title: "Lesson 13: Coevolution of Earth and Life 5E - Explain", objective: "How did Earth’s systems and living things coevolve?" },
                        { title: "Lesson 14: Coevolution of Earth and Life 5E - Elaborate", objective: "How have extinction events affected the evolution of living things?" },
                        { title: "Lesson 15: Coevolution of Earth and Life 5E - Evaluate", objective: "Why did it take so long for intelligent life to evolve on Earth?" }
                    ]
                },
                "Origin of the Universe 5E": {
                    lessons: [
                        { title: "Lesson 16: Origin of the Universe - Engage", objective: "Where did everything in the universe come from? Has the universe always been the same?" },
                        { title: "Lesson 17: Origin of the Universe - Explore", objective: "Investigating light from stars in other galaxies." },
                        { title: "Lesson 18: Origin of the Universe - Explain", objective: "Explaining redshift and making inferences about the universe in the past" },
                        { title: "Lesson 19: Origin of the Universe - Elaborate", objective: "Exploring additional evidence for the Big Bang theory and constructing an explanation for the origin of the universe." },
                        { title: "Lesson 20: Origin of the Universe - Evaluate", objective: "Is it probable that there is life elsewhere in the universe?" }
                    ]
                },
                "Asteroid Orbits 5E": {
                    lessons: [
                        { title: "Lesson 21: Asteroid Orbits 5E - Engage", objective: "What are the chances of another major asteroid hitting Earth?" },
                        { title: "Lesson 22: Asteroid Orbits 5E - Explore", objective: "What patterns do different objects follow as they travel through space?" },
                        { title: "Lesson 23: Asteroid Orbits 5E - Explain", objective: "How do we predict motions of asteroids and planets?" },
                        { title: "Lesson 24: Asteroid Orbits 5E - Elaborate", objective: "How can we alter the path of an asteroid headed straight toward Earth?" },
                        { title: "Lesson 25: Asteroid Orbits 5E - Evaluate", objective: "What can humans do to defend the planet from another asteroid mass extinction?" }
                    ]
                },
                "Unit Closing": {
                    lessons: [
                        { title: "Lesson 26: Unit Closing", objective: "Students will now be able to apply all their learning to the unit to write their final argument about whether intelligent life exists elsewhere in the universe, then have an oral argument based on evidence with their classmates." }
                    ]
                }
            }
        }
    }
};

    