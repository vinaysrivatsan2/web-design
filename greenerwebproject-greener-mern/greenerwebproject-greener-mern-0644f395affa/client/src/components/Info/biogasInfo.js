import React from 'react';
import './Info.css';
import wind1 from '../../assets/images/biogas1.jpg'
import wind2 from '../../assets/images/biogas6.jpg'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
function biogasInfo() {
  return (
    <div id="windbg">

      <h3 id="head1"><i>BIOGAS</i></h3>
      <div id="wind">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src={wind1} alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src={wind2} alt="Second slide" />
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>

    <div>
    </div>
    <div id="head2">
        <p  >
          Biogas is a type of biofuel that is naturally produced from the decomposition of organic waste. When organic matter, such as food scraps and animal waste, break down in an anaerobic environment (an environment absent of oxygen) they release a blend of gases, primarily methane and carbon dioxide.  Because this decomposition happens in an anaerobic environment, the process of producing biogas is also known as anaerobic digestion.Anaerobic digestion is a natural form of waste-to-energy that uses the process of fermentation to breakdown organic matter. Animal manure, food scraps, wastewater, and sewage are all examples of organic matter that can produce biogas by anaerobic digestion. Due to the high content of methane in biogas (typically 50-75%) biogas is flammable, and therefore produces a deep blue flame, and can be used as an energy source.By converting organic waste into energy, biogas is utilizing nature’s elegant tendency to recycle substances into productive resources. Biogas generation recovers waste materials that would otherwise pollute landfills; prevents the use of toxic chemicals in sewage treatment plants, and saves money, energy, and material by treating waste on-site. Moreover, biogas usage does not require fossil fuel extraction to produce energy. Instead, biogas takes a problematic gas, and converts it into a much safer form. More specifically, the methane content present in decomposing waste is converted into carbon dioxide. Methane gas has approximately 20 to 30 times the heat-trapping capabilities of carbon dioxide. This means that when a rotting loaf of bread converts into biogas, the loaf’s environmental impact will be about 10 times less potent than if it was left to rot in a landfill.
  
  
        </p>

    </div>


    </div>
  )
};

export default biogasInfo;