import React from 'react';
import './Info.css';
import wind1 from '../../assets/images/reuse1.jpg'
import wind2 from '../../assets/images/reuse2.jpg'
import{BrowserRouter as Router,Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
function recycleInfo() {
    return (
      <div id = "windbg">
        
      <h3 id="head1"><i>REUSE</i></h3>
        <div id="wind">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src={wind1} alt="First slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={wind2} alt="Second slide"/>
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

        <div id="head2">
        <p >
        The most effective way to reduce waste is to not create it in the first place. Making a new product requires a lot of materials and energy - raw materials must be extracted from the earth, and the product must be fabricated then transported to wherever it will be sold. As a result, reduction and reuse are the most effective ways you can save natural resources, protect the environment and save money.One person's trash is another person's treasure. Instead of discarding unwanted appliances, tools or clothes, try selling or donating them. Not only will you be reducing waste, you'll be helping others. Local churches, community centers, thrift stores, schools and nonprofit organizations may accept a variety of donated items, including used books, working electronics and unneeded furniture.Reuse is the action or practice of using an item, whether for its original purpose (conventional reuse) or to fulfil a different function (creative reuse or repurposing). It should be distinguished from recycling, which is the breaking down of used items to make raw materials for the manufacture of new products. Reuse – by taking, but not reprocessing, previously used items – helps save time, money, energy and resources. In broader economic terms, it can make quality products available to people and organizations with limited means, while generating jobs and business activity that contribute to the economy.Historically, financial motivation was one of the main drivers of reuse. In the developing world this driver can lead to very high levels of reuse, however rising wages and consequent consumer demand for the convenience of disposable products has made the reuse of low value items such as packaging uneconomic in richer countries, leading to the demise of many reuse programs. Current environmental awareness is gradually changing attitudes and regulations, such as the new packaging regulations, are gradually beginning to reverse the situation.
        </p>
        
        </div>
        
        
        </div>
        )};

        export default recycleInfo;