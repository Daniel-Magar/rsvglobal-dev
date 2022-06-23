import React, { useEffect, useState } from "react";
import Container from "./Container";
import SideNav from "./SideNav";
import "./adminpanel.css";
import { useRecoilState } from "recoil";
import ToggleAtom from "../Recoil/ToggleAtom";
import Header from "./Header";

const AdminDashboard = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  return (
    <>
      <SideNav />
      <div
        className={`content-admin ${
          toggle ? "admin-active" : "admin-inactive"
        }`}
      >
        <Header />
        <p className="admin-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At alias
          minima illum animi inventore dolor explicabo blanditiis eius maiores
          repellendus, beatae doloribus excepturi nobis voluptate quo quaerat
          tempore dicta consectetur eaque magni sunt deserunt! Tenetur, aperiam
          ipsum deserunt ratione, provident, exercitationem quod nesciunt rerum
          non officia eum suscipit! Ex dolores aperiam iste. Impedit pariatur
          fuga fugiat illo magni iure quasi. Odio explicabo quod recusandae
          saepe, voluptas cum accusantium placeat nesciunt alias commodi
          repudiandae incidunt possimus, eum ex exercitationem ratione omnis
          mollitia vel. Omnis sapiente reprehenderit, ex pariatur voluptate
          similique beatae architecto in voluptas qui dolorum quia veritatis
          corrupti quas consectetur ad earum illum quidem expedita modi
          exercitationem rem et est id. Ullam odio officia distinctio atque
          blanditiis harum eos magni doloremque, eligendi inventore enim
          reiciendis facere cum commodi. Voluptas minus distinctio harum sint
          animi quidem perspiciatis dignissimos quis mollitia iusto cumque at
          rem cum eius ab minima commodi ullam laboriosam molestias libero
          molestiae, officia soluta. Voluptate, maxime quibusdam accusantium
          quisquam quos dolore recusandae doloribus? Distinctio commodi, autem,
          ipsum maxime amet repellat, nihil porro deleniti eius ipsam quas cum.
          Ut, libero corrupti iure impedit rem repellendus consequuntur, sit
          veritatis, hic repudiandae harum quam! Adipisci repellat quos
          doloremque odit neque impedit modi? Consequuntur quibusdam magnam
          saepe rerum magni beatae aut nobis quam quaerat? Impedit harum
          voluptates voluptatem velit recusandae quasi id perferendis corporis
          amet quo sapiente minus esse ad provident culpa suscipit consectetur
          fuga facere, possimus modi? Dolores molestiae numquam, ipsam
          asperiores nobis ducimus. Ipsa voluptas iusto maxime ex. Voluptates
          commodi saepe mollitia quisquam et culpa eligendi ea minima
          temporibus, quo modi accusamus nulla quasi ex veniam dolorum animi ut
          illum eos. Sed quia asperiores dicta fugiat officia, molestias quidem
          dolores architecto, magnam facilis, voluptas minus. Ut velit, dolor
          facere illum recusandae quae ducimus cumque delectus obcaecati ad
          magnam natus et error temporibus suscipit accusantium adipisci atque
          modi harum quod voluptas magni. Excepturi, fugit. Eveniet quibusdam
          ipsam ipsa minima dolores animi at libero quasi impedit voluptate,
          distinctio consequatur asperiores vel perferendis itaque rerum nam
          possimus magnam necessitatibus inventore odit tempore quisquam natus?
          Necessitatibus est, officia quasi reiciendis consequuntur atque
          molestiae ipsum aliquam vel quaerat. Accusamus perspiciatis quos nihil
          cupiditate repudiandae minus id eum? Delectus accusamus autem totam
          corrupti laboriosam, voluptatum odit fugiat sit libero repellendus,
          hic voluptas! Consequuntur error aliquid exercitationem, nam esse
          voluptatem perferendis odit asperiores quibusdam, aspernatur, tempore
          at corporis adipisci cum. A, dolor provident possimus obcaecati ipsa,
          in similique aspernatur nihil hic earum, saepe maxime accusamus. Vero,
          ut delectus est dolores non sunt iste dolor, molestias iusto quam
          tempora quibusdam et vitae fuga? Aperiam, velit consequatur.
          Perspiciatis quibusdam earum necessitatibus nostrum natus eum aliquid
          vitae consequatur facilis fuga. Suscipit quam incidunt sed rerum
          voluptatem voluptate laudantium nisi modi optio nihil numquam
          architecto dolor ut non eaque vitae pariatur ipsam voluptatum ab
          tempore deleniti, dolorem nostrum! Culpa molestiae dolorem placeat,
          sapiente velit dolore porro accusamus amet ad obcaecati error
          distinctio aperiam ullam unde? Modi esse earum provident voluptates
          rerum tenetur, officia rem voluptate, nisi magni saepe at nesciunt
          vitae omnis atque veniam? Voluptate eaque aut ullam aperiam minus
          incidunt, sint aliquid quia! Quos reiciendis sed cumque vel eligendi,
          sint numquam dicta exercitationem, facilis commodi blanditiis quo
          voluptates quod dolor at dignissimos inventore, deserunt debitis?
          Neque animi dolor eveniet at delectus possimus quas ipsam molestias
          labore repudiandae? Aperiam rerum repellat odio illum ratione maiores
          esse soluta corrupti assumenda asperiores, iste, minima repellendus
          maxime vel sapiente laboriosam placeat quos quisquam commodi nemo ut.
          Alias cum possimus quam id aliquam praesentium perferendis voluptatum
          asperiores incidunt! Eveniet, quae numquam eos ea voluptas nesciunt
          quia exercitationem laudantium unde repudiandae autem. Dicta quidem,
          aliquam dolore fugiat voluptate dolorum incidunt eaque ducimus enim
          recusandae sunt obcaecati perferendis repudiandae aperiam earum quasi
          ad illum, fuga dignissimos. Quis provident, similique expedita
          accusantium cupiditate consequuntur? Sint beatae, quo laudantium culpa
          quam quibusdam tempore recusandae delectus, aliquam nobis soluta rem
          nesciunt ab atque exercitationem? Consequuntur quibusdam ipsam earum
          atque placeat accusamus quod tempore, velit aut, voluptatum unde
          similique voluptatem quidem voluptates sit laboriosam molestias nobis,
          numquam dolorum harum iste commodi? Sed magnam magni earum ipsam,
          mollitia minima sunt laboriosam in deserunt odit nemo provident ipsum
          veniam quis? Inventore praesentium tempore laborum quo eos tenetur
          quae temporibus eveniet consectetur deleniti porro est beatae
          laudantium reiciendis eum molestias ut aperiam commodi et, maiores
          autem, dignissimos suscipit adipisci? Corporis asperiores aliquid ea
          repellat itaque quos eaque in sapiente alias eligendi, cumque deserunt
          assumenda odit ullam possimus? Hic omnis sit suscipit reiciendis
          recusandae consequatur temporibus dolores, expedita eligendi saepe
          repudiandae exercitationem consequuntur! Quae dolorem, natus ipsa
          labore velit laboriosam, esse non quas maiores provident quia expedita
          voluptatem, ipsum illo ullam officia. Sint repudiandae rerum corrupti
          hic optio iure quibusdam quisquam porro harum nam. Ducimus
          consequuntur ex porro ullam quasi hic corrupti ad, inventore veniam,
          in asperiores id quidem eveniet doloremque? Animi, asperiores? Cumque,
          eius earum suscipit ducimus nam, illo explicabo ut molestiae eum, in
          aut nulla temporibus aperiam ipsum beatae provident inventore saepe
          laboriosam pariatur libero blanditiis repellat laudantium! Earum
          soluta dolorum atque minus doloremque molestiae reprehenderit odit
          distinctio, ut neque amet alias dicta provident? Itaque laboriosam
          ullam inventore commodi officia, facere aliquid sed numquam voluptate
          est et tempore nemo natus! Repudiandae sit est, nobis vitae, ullam
          molestiae accusantium quaerat asperiores, error voluptatum repellat!
          Doloribus maiores hic enim, aut explicabo repudiandae dicta iste eos,
          neque tenetur magnam. Rerum laboriosam perspiciatis error deserunt
          excepturi quod dolorum vero eligendi voluptatibus sint quo sequi
          reiciendis esse tempora odio culpa itaque inventore recusandae
          repellat, ipsam vitae doloremque tempore repellendus mollitia. Odit
          deleniti nesciunt dolorum unde a, ea at omnis? Mollitia deserunt
          quaerat numquam asperiores ex? Non beatae tempora cumque sunt neque
          accusamus fugit accusantium consectetur. Deleniti veniam unde ad.
          Corrupti beatae fuga dolorem repudiandae reprehenderit error velit,
          eum quidem ullam. Optio sit quae porro, corrupti explicabo temporibus
          dolorem ipsum rem sed ipsam, adipisci aspernatur voluptatibus soluta
          similique fugiat deserunt iste cupiditate commodi! Aut dicta incidunt
          praesentium, sunt iste labore adipisci nulla, necessitatibus dolores
          corporis quisquam dolorum iusto sapiente cumque vel omnis soluta saepe
          officia hic ab ipsa ullam. Nisi?
        </p>
      </div>
    </>
  );
};

export default AdminDashboard;
