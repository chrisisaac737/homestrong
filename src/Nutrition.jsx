import { useState } from 'react'

const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const plans = {
  poids: {
    conseil: 'Un déficit de 300 kcal par jour suffit pour perdre 1 kg par mois sans te priver.',
    calories: 1600,
    semaine: [
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 320, prix: 1.20, icone: '🌅', bg: '#fff8e8', plat: 'Flocons d\'avoine aux fruits', ingr: '80g flocons · 1 banane · 200ml lait demi-écrémé', steps: ['Faire chauffer le lait 2 min', 'Verser sur les flocons, laisser gonfler 3 min', 'Ajouter la banane en rondelles'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 520, prix: 2.10, icone: '☀️', bg: '#e8f7f1', plat: 'Riz + poulet + légumes surgelés', ingr: '150g riz · 120g poulet · 100g légumes surgelés · épices', steps: ['Cuire le riz 12 min', 'Faire sauter le poulet 8 min avec épices', 'Ajouter les légumes 3 min en fin de cuisson'] },
          { nom: 'Dîner', heure: '19h00', kcal: 480, prix: 1.50, icone: '🌙', bg: '#f0f0eb', plat: 'Soupe lentilles + pain complet', ingr: '200g lentilles · 1 carotte · 1 oignon · 2 tranches pain', steps: ['Faire revenir oignon et carotte 5 min', 'Ajouter lentilles + 600ml eau, cuire 20 min', 'Mixer partiellement et servir'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 280, prix: 0.90, icone: '🌅', bg: '#fff8e8', plat: 'Yaourt grec + granola', ingr: '200g yaourt grec · 30g granola · 1 pomme', steps: ['Verser le yaourt dans un bol', 'Ajouter le granola', 'Couper la pomme en dés et mélanger'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 540, prix: 2.30, icone: '☀️', bg: '#e8f7f1', plat: 'Salade de quinoa + thon + tomates', ingr: '150g quinoa cuit · 1 boite thon · 2 tomates · huile d\'olive', steps: ['Cuire le quinoa 15 min et laisser refroidir', 'Égoutter le thon', 'Mélanger tous les ingrédients et assaisonner'] },
          { nom: 'Dîner', heure: '19h00', kcal: 460, prix: 1.80, icone: '🌙', bg: '#f0f0eb', plat: 'Omelette aux légumes + salade verte', ingr: '3 oeufs · 1 courgette · 1 poivron · salade verte', steps: ['Faire revenir les légumes 5 min', 'Battre les oeufs et verser', 'Cuire 4 min et servir avec la salade'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 300, prix: 1.10, icone: '🌅', bg: '#fff8e8', plat: 'Pain complet + oeuf poché + avocat', ingr: '2 tranches pain · 2 oeufs · 1/2 avocat', steps: ['Porter l\'eau à frémissement', 'Pocher les oeufs 3 min', 'Servir sur le pain avec l\'avocat écrasé'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 510, prix: 2.00, icone: '☀️', bg: '#e8f7f1', plat: 'Pâtes complètes + sauce tomate + dinde', ingr: '150g pâtes complètes · 100g dinde · 200ml sauce tomate', steps: ['Cuire les pâtes 10 min', 'Faire sauter la dinde 6 min', 'Mélanger avec la sauce tomate chaude'] },
          { nom: 'Dîner', heure: '19h00', kcal: 440, prix: 1.60, icone: '🌙', bg: '#f0f0eb', plat: 'Velouté de carottes + pain', ingr: '4 carottes · 1 oignon · 200ml lait · 2 tranches pain', steps: ['Cuire carottes et oignon 15 min', 'Mixer avec le lait', 'Assaisonner et servir chaud'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 310, prix: 1.00, icone: '🌅', bg: '#fff8e8', plat: 'Smoothie banane + flocons', ingr: '1 banane · 200ml lait · 50g flocons d\'avoine · 1 c.à.c miel', steps: ['Mettre tous les ingrédients dans un mixeur', 'Mixer 30 secondes', 'Servir immédiatement'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 530, prix: 2.20, icone: '☀️', bg: '#e8f7f1', plat: 'Bol buddha — riz + pois chiches + légumes', ingr: '150g riz · 100g pois chiches · 1 carotte · 1 concombre', steps: ['Cuire le riz et égoutter les pois chiches', 'Râper la carotte, trancher le concombre', 'Assembler dans un bol et assaisonner'] },
          { nom: 'Dîner', heure: '19h00', kcal: 450, prix: 1.70, icone: '🌙', bg: '#f0f0eb', plat: 'Filet de poisson + haricots verts', ingr: '150g poisson blanc · 200g haricots verts · citron · herbes', steps: ['Cuire le poisson 12 min à la vapeur', 'Faire sauter les haricots 5 min', 'Assaisonner avec citron et herbes'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 290, prix: 0.95, icone: '🌅', bg: '#fff8e8', plat: 'Bol de fruits + fromage blanc', ingr: '200g fromage blanc 0% · 1 kiwi · 1 orange · 1 c.à.s miel', steps: ['Verser le fromage blanc dans un bol', 'Couper les fruits en morceaux', 'Ajouter le miel et mélanger'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 500, prix: 2.00, icone: '☀️', bg: '#e8f7f1', plat: 'Wrap poulet + crudités', ingr: '1 tortilla · 100g poulet · laitue · tomates · yaourt', steps: ['Réchauffer le poulet 3 min', 'Garnir la tortilla de légumes', 'Ajouter le poulet et rouler'] },
          { nom: 'Dîner', heure: '19h00', kcal: 470, prix: 1.60, icone: '🌙', bg: '#f0f0eb', plat: 'Curry de lentilles corail', ingr: '200g lentilles corail · 200ml lait de coco light · curry · tomates', steps: ['Faire revenir les épices 1 min', 'Ajouter lentilles + lait de coco + tomates', 'Cuire 20 min à feu doux'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '8h00', kcal: 340, prix: 1.30, icone: '🌅', bg: '#fff8e8', plat: 'Pancakes à l\'avoine (3 petits)', ingr: '60g flocons d\'avoine · 1 oeuf · 100ml lait · fruits rouges', steps: ['Mixer flocons, oeuf et lait', 'Cuire 2 min de chaque côté', 'Servir avec les fruits rouges'] },
          { nom: 'Déjeuner', heure: '13h00', kcal: 560, prix: 2.40, icone: '☀️', bg: '#e8f7f1', plat: 'Tartines complètes + saumon + concombre', ingr: '3 tartines pain complet · 80g saumon fumé · 1/2 concombre · citron', steps: ['Tartiner les tranches', 'Disposer le saumon et le concombre', 'Arroser de citron'] },
          { nom: 'Dîner', heure: '19h30', kcal: 490, prix: 1.80, icone: '🌙', bg: '#f0f0eb', plat: 'Poêlée de légumes + tofu', ingr: '200g tofu ferme · 1 poivron · 1 courgette · sauce soja', steps: ['Couper le tofu en dés et faire dorer', 'Ajouter les légumes 5 min', 'Assaisonner avec sauce soja'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '9h00', kcal: 350, prix: 1.40, icone: '🌅', bg: '#fff8e8', plat: 'Oeufs brouillés + toast + jus orange', ingr: '2 oeufs · 2 toasts complets · 1 orange pressée', steps: ['Presser l\'orange', 'Brouiller les oeufs 3 min à feu doux', 'Servir sur les toasts'] },
          { nom: 'Déjeuner', heure: '13h00', kcal: 540, prix: 2.20, icone: '☀️', bg: '#e8f7f1', plat: 'Gratin de courgettes + jambon', ingr: '2 courgettes · 2 tranches jambon · 1 oeuf · 50g fromage', steps: ['Trancher les courgettes et blanchir 3 min', 'Mélanger oeuf et fromage', 'Gratiner 20 min au four à 180°'] },
          { nom: 'Dîner', heure: '19h00', kcal: 460, prix: 1.70, icone: '🌙', bg: '#f0f0eb', plat: 'Soupe minestrone + pain', ingr: '1 boite tomates · 1 courgette · 1 carotte · 50g pâtes · pain', steps: ['Faire revenir les légumes 5 min', 'Ajouter tomates + eau + pâtes', 'Cuire 15 min et servir'] },
        ]
      },
    ],
    courses: [
      { nom: 'Flocons d\'avoine (1kg)', prix: 3.20 },
      { nom: 'Bananes (1kg)', prix: 1.80 },
      { nom: 'Blancs de poulet (1kg)', prix: 8.50 },
      { nom: 'Riz complet (2kg)', prix: 4.20 },
      { nom: 'Légumes surgelés (1kg)', prix: 3.50 },
      { nom: 'Lentilles corail (500g)', prix: 2.10 },
      { nom: 'Oeufs (x18)', prix: 5.20 },
      { nom: 'Yaourt grec (x6)', prix: 4.80 },
      { nom: 'Pain complet', prix: 2.80 },
      { nom: 'Quinoa (500g)', prix: 3.90 },
      { nom: 'Thon en boite (x4)', prix: 5.60 },
      { nom: 'Pâtes complètes (1kg)', prix: 2.50 },
      { nom: 'Tomates (1kg)', prix: 2.20 },
      { nom: 'Courgettes (x4)', prix: 2.40 },
      { nom: 'Carottes (1kg)', prix: 1.80 },
      { nom: 'Pois chiches (x2)', prix: 2.60 },
    ],
    vitamines: [
      { emoji: '🍋', nom: 'Vitamine C', role: 'Récupération musculaire et immunité', aliments: ['Orange', 'Kiwi', 'Poivron'] },
      { emoji: '🥚', nom: 'Protéines', role: 'Construction et réparation musculaire', aliments: ['Oeuf', 'Poulet', 'Thon'] },
      { emoji: '🥬', nom: 'Fer', role: 'Transport de l\'oxygène et endurance', aliments: ['Lentilles', 'Épinards', 'Tofu'] },
      { emoji: '🍌', nom: 'Magnésium', role: 'Réduit les crampes et la fatigue', aliments: ['Banane', 'Amandes', 'Avoine'] },
    ]
  },
  muscle: {
    conseil: 'Pour gagner du muscle, mange +200 kcal par jour — pas besoin d\'avaler des quantités folles.',
    calories: 2200,
    semaine: [
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 480, prix: 1.50, icone: '🌅', bg: '#fff8e8', plat: 'Omelette + pain complet + fromage', ingr: '3 oeufs · 2 tranches pain · 30g fromage râpé · lait', steps: ['Battre les oeufs avec sel et poivre', 'Cuire l\'omelette 3 min à feu moyen', 'Servir avec pain et fromage'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 680, prix: 2.50, icone: '☀️', bg: '#e8f7f1', plat: 'Pâtes + thon + tomates', ingr: '200g pâtes cuites · 1 boite thon · 2 tomates · huile d\'olive', steps: ['Cuire les pâtes 10 min', 'Mélanger thon + tomates + filet d\'huile', 'Mélanger avec les pâtes chaudes'] },
          { nom: 'Dîner', heure: '19h00', kcal: 720, prix: 2.30, icone: '🌙', bg: '#f0f0eb', plat: 'Riz + oeufs brouillés + haricots rouges', ingr: '180g riz cuit · 2 oeufs · 150g haricots rouges · épices', steps: ['Cuire le riz et chauffer les haricots', 'Brouiller les oeufs 3 min à feu doux', 'Assembler dans un bol et assaisonner'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 520, prix: 1.70, icone: '🌅', bg: '#fff8e8', plat: 'Porridge protéiné + fruits secs', ingr: '100g flocons · 250ml lait entier · 1 banane · 30g noix', steps: ['Cuire les flocons dans le lait 5 min', 'Ajouter la banane en rondelles', 'Parsemer de noix concassées'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 700, prix: 2.60, icone: '☀️', bg: '#e8f7f1', plat: 'Riz + saumon + brocolis', ingr: '180g riz · 150g saumon · 200g brocolis · huile olive', steps: ['Cuire le riz 12 min', 'Faire sauter le saumon 6 min', 'Cuire les brocolis vapeur 8 min'] },
          { nom: 'Dîner', heure: '19h00', kcal: 680, prix: 2.20, icone: '🌙', bg: '#f0f0eb', plat: 'Poulet rôti + pommes de terre + salade', ingr: '200g poulet · 250g pommes de terre · salade verte · moutarde', steps: ['Rôtir le poulet 25 min à 180°', 'Cuire les pommes de terre 20 min', 'Assaisonner la salade et servir'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 500, prix: 1.60, icone: '🌅', bg: '#fff8e8', plat: 'Pain + beurre de cacahuète + banane', ingr: '3 tranches pain · 2 c.à.s beurre cacahuète · 1 banane · lait', steps: ['Tartiner le pain de beurre de cacahuète', 'Couper la banane en rondelles', 'Servir avec un grand verre de lait'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 720, prix: 2.70, icone: '☀️', bg: '#e8f7f1', plat: 'Quinoa + poulet + avocat', ingr: '180g quinoa cuit · 150g poulet · 1 avocat · citron', steps: ['Cuire le quinoa 15 min', 'Faire griller le poulet 8 min', 'Servir avec l\'avocat et citron'] },
          { nom: 'Dîner', heure: '19h00', kcal: 700, prix: 2.40, icone: '🌙', bg: '#f0f0eb', plat: 'Lentilles + saucisse dinde + légumes', ingr: '200g lentilles · 2 saucisses dinde · 1 carotte · 1 oignon', steps: ['Cuire lentilles et légumes 25 min', 'Faire dorer les saucisses 8 min', 'Mélanger et assaisonner'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 510, prix: 1.80, icone: '🌅', bg: '#fff8e8', plat: 'Smoothie bowl protéiné', ingr: '200ml lait · 1 banane · 2 c.à.s flocons · 30g amandes · fruits', steps: ['Mixer lait, banane et flocons', 'Verser dans un bol', 'Garnir d\'amandes et fruits'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 690, prix: 2.50, icone: '☀️', bg: '#e8f7f1', plat: 'Riz + steak haché + courgettes', ingr: '180g riz · 150g steak haché 5% · 2 courgettes · épices', steps: ['Cuire le riz', 'Faire cuire le steak 5 min', 'Poêler les courgettes 5 min et assembler'] },
          { nom: 'Dîner', heure: '19h00', kcal: 710, prix: 2.30, icone: '🌙', bg: '#f0f0eb', plat: 'Gratin de pâtes + jambon + fromage', ingr: '200g pâtes · 3 tranches jambon · 60g fromage · 200ml lait', steps: ['Cuire les pâtes', 'Mélanger avec lait et jambon', 'Gratiner 15 min au four'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 490, prix: 1.55, icone: '🌅', bg: '#fff8e8', plat: 'Oeufs à la coque + mouillettes + jus', ingr: '3 oeufs · 3 tranches pain · 1 orange pressée · beurre', steps: ['Cuire les oeufs 6 min à l\'eau bouillante', 'Toaster le pain et beurrer', 'Presser l\'orange et servir'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 710, prix: 2.60, icone: '☀️', bg: '#e8f7f1', plat: 'Burger maison + patate douce', ingr: '150g boeuf haché · 1 pain burger · 1 patate douce · salade', steps: ['Cuire la patate douce 25 min', 'Faire cuire le steak 4 min de chaque côté', 'Assembler le burger avec la salade'] },
          { nom: 'Dîner', heure: '19h00', kcal: 690, prix: 2.20, icone: '🌙', bg: '#f0f0eb', plat: 'Soupe de pois cassés + pain', ingr: '200g pois cassés · 1 jambon · 1 carotte · 1 oignon · pain', steps: ['Faire revenir oignon et carotte', 'Ajouter pois + jambon + eau', 'Cuire 30 min et mixer légèrement'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '8h00', kcal: 530, prix: 1.90, icone: '🌅', bg: '#fff8e8', plat: 'Pancakes protéinés + sirop érable', ingr: '80g flocons · 2 oeufs · 150ml lait · sirop érable · fruits', steps: ['Mixer tous les ingrédients', 'Cuire 2 min de chaque côté', 'Servir avec sirop et fruits'] },
          { nom: 'Déjeuner', heure: '13h00', kcal: 720, prix: 2.70, icone: '☀️', bg: '#e8f7f1', plat: 'Pâtes au saumon + crème légère', ingr: '200g pâtes · 150g saumon · 100ml crème légère · aneth', steps: ['Cuire les pâtes', 'Poêler le saumon 6 min', 'Mélanger avec la crème et servir'] },
          { nom: 'Dîner', heure: '19h30', kcal: 700, prix: 2.30, icone: '🌙', bg: '#f0f0eb', plat: 'Poulet mariné + riz + haricots verts', ingr: '200g poulet · 150g riz · 200g haricots verts · marinade soja-miel', steps: ['Mariner le poulet 30 min', 'Cuire le riz et les haricots', 'Faire griller le poulet 10 min'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '9h00', kcal: 520, prix: 1.80, icone: '🌅', bg: '#fff8e8', plat: 'Brunch oeufs Benedict simplifié', ingr: '2 oeufs pochés · 2 tranches jambon · 2 muffins anglais · sauce', steps: ['Toaster les muffins', 'Pocher les oeufs 3 min', 'Assembler avec jambon et sauce yaourt-moutarde'] },
          { nom: 'Déjeuner', heure: '13h30', kcal: 700, prix: 2.60, icone: '☀️', bg: '#e8f7f1', plat: 'Plateau protéiné — oeufs + fromage + pain', ingr: '3 oeufs durs · 60g fromage · 3 tranches pain · tomates · noix', steps: ['Cuire les oeufs durs 9 min', 'Trancher le fromage', 'Assembler avec pain et tomates'] },
          { nom: 'Dîner', heure: '19h00', kcal: 710, prix: 2.40, icone: '🌙', bg: '#f0f0eb', plat: 'Risotto poulet + parmesan', ingr: '180g riz arborio · 150g poulet · 40g parmesan · bouillon', steps: ['Faire revenir le poulet 6 min', 'Ajouter le riz et bouillon progressivement', 'Incorporer le parmesan en fin'] },
        ]
      },
    ],
    courses: [
      { nom: 'Oeufs (x18)', prix: 5.20 },
      { nom: 'Pâtes (1kg)', prix: 2.50 },
      { nom: 'Thon en boite (x4)', prix: 5.60 },
      { nom: 'Haricots rouges (x3)', prix: 3.60 },
      { nom: 'Riz (2kg)', prix: 4.20 },
      { nom: 'Poulet (1kg)', prix: 8.50 },
      { nom: 'Fromage râpé (400g)', prix: 4.80 },
      { nom: 'Flocons d\'avoine (1kg)', prix: 3.20 },
      { nom: 'Bananes (1kg)', prix: 1.80 },
      { nom: 'Saumon (400g)', prix: 7.50 },
      { nom: 'Beurre de cacahuète (350g)', prix: 3.90 },
      { nom: 'Pain complet', prix: 2.80 },
      { nom: 'Lait entier (2L)', prix: 3.20 },
      { nom: 'Amandes (200g)', prix: 4.50 },
      { nom: 'Quinoa (500g)', prix: 3.90 },
    ],
    vitamines: [
      { emoji: '🥚', nom: 'Protéines', role: 'Indispensables à la synthèse musculaire', aliments: ['Oeuf', 'Thon', 'Poulet'] },
      { emoji: '🍌', nom: 'Potassium', role: 'Prévient les crampes musculaires', aliments: ['Banane', 'Pomme de terre', 'Avocat'] },
      { emoji: '☀️', nom: 'Vitamine D', role: 'Favorise la croissance musculaire', aliments: ['Saumon', 'Oeufs', 'Lait'] },
      { emoji: '🌱', nom: 'Zinc', role: 'Régénération cellulaire et récupération', aliments: ['Viande', 'Lentilles', 'Noix'] },
    ]
  },
  energie: {
    conseil: 'L\'énergie vient de la régularité. 3 repas équilibrés valent mieux qu\'1 gros repas par jour.',
    calories: 1800,
    semaine: [
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 380, prix: 1.30, icone: '🌅', bg: '#fff8e8', plat: 'Yaourt + granola + fruits rouges', ingr: '200g yaourt grec · 40g granola · 80g fruits rouges surgelés', steps: ['Sortir les fruits rouges 10 min avant', 'Verser le yaourt dans un bol', 'Ajouter granola et fruits'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 560, prix: 2.00, icone: '☀️', bg: '#e8f7f1', plat: 'Salade complète aux lentilles', ingr: '150g lentilles cuites · 2 oeufs durs · 1 carotte râpée · vinaigrette', steps: ['Cuire les lentilles 20 min', 'Cuire les oeufs 9 min', 'Mélanger avec carotte et assaisonner'] },
          { nom: 'Dîner', heure: '19h00', kcal: 620, prix: 1.90, icone: '🌙', bg: '#f0f0eb', plat: 'Quinoa + légumes rôtis + oeuf poché', ingr: '150g quinoa cuit · 200g courgettes + poivrons · 1 oeuf', steps: ['Cuire le quinoa 15 min', 'Rôtir les légumes 20 min à 180°', 'Pocher l\'oeuf 3 min et assembler'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 360, prix: 1.10, icone: '🌅', bg: '#fff8e8', plat: 'Smoothie vert énergisant', ingr: '1 banane · 1 poignée épinards · 200ml lait · 1 c.à.c miel · 30g flocons', steps: ['Mettre tous les ingrédients dans le mixeur', 'Mixer 1 minute', 'Servir frais immédiatement'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 580, prix: 2.10, icone: '☀️', bg: '#e8f7f1', plat: 'Riz + poulet + épinards sautés', ingr: '150g riz · 120g poulet · 100g épinards · ail · huile olive', steps: ['Cuire le riz 12 min', 'Faire sauter le poulet avec l\'ail', 'Ajouter les épinards 2 min en fin'] },
          { nom: 'Dîner', heure: '19h00', kcal: 580, prix: 1.80, icone: '🌙', bg: '#f0f0eb', plat: 'Soupe de patate douce + pain', ingr: '2 patates douces · 1 oignon · 200ml lait de coco · pain', steps: ['Cuire patates douces et oignon 15 min', 'Mixer avec le lait de coco', 'Assaisonner et servir avec le pain'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 370, prix: 1.20, icone: '🌅', bg: '#fff8e8', plat: 'Tartines complètes + oeuf + tomate', ingr: '2 tranches pain complet · 2 oeufs · 1 tomate · herbes · huile olive', steps: ['Toaster le pain', 'Cuire les oeufs au plat 3 min', 'Servir avec la tomate tranchée et herbes'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 570, prix: 2.00, icone: '☀️', bg: '#e8f7f1', plat: 'Pâtes complètes + pesto + jambon', ingr: '150g pâtes complètes · 2 c.à.s pesto · 2 tranches jambon · parmesan', steps: ['Cuire les pâtes 10 min', 'Mélanger avec le pesto', 'Ajouter le jambon et le parmesan'] },
          { nom: 'Dîner', heure: '19h00', kcal: 590, prix: 1.90, icone: '🌙', bg: '#f0f0eb', plat: 'Curry doux de pois chiches + riz', ingr: '200g pois chiches · 200ml lait de coco · curry doux · 100g riz', steps: ['Faire revenir le curry 1 min', 'Ajouter pois chiches et lait de coco', 'Cuire 15 min et servir sur le riz'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 390, prix: 1.40, icone: '🌅', bg: '#fff8e8', plat: 'Bowl açaï maison', ingr: '200g yaourt · 1 banane congelée · 30g granola · fruits frais · miel', steps: ['Mixer yaourt et banane congelée', 'Verser dans un bol', 'Garnir de granola, fruits et miel'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 570, prix: 2.10, icone: '☀️', bg: '#e8f7f1', plat: 'Bol méditerranéen — quinoa + feta + olives', ingr: '150g quinoa · 50g feta · 50g olives · concombre · tomates', steps: ['Cuire le quinoa et laisser refroidir', 'Couper les légumes', 'Assembler et assaisonner à l\'huile olive'] },
          { nom: 'Dîner', heure: '19h00', kcal: 610, prix: 2.00, icone: '🌙', bg: '#f0f0eb', plat: 'Soupe miso + riz + tofu', ingr: '150g tofu · 100g riz · 1 sachet miso · algues · ciboule', steps: ['Cuire le riz', 'Préparer le bouillon miso chaud', 'Ajouter tofu en dés et algues'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '7h30', kcal: 360, prix: 1.15, icone: '🌅', bg: '#fff8e8', plat: 'Avoine overnight aux amandes', ingr: '80g flocons · 200ml lait · 20g amandes · 1 c.à.s sirop érable', steps: ['La veille : mélanger flocons et lait', 'Laisser au frigo toute la nuit', 'Le matin : ajouter amandes et sirop'] },
          { nom: 'Déjeuner', heure: '12h30', kcal: 580, prix: 2.00, icone: '☀️', bg: '#e8f7f1', plat: 'Wrap végétarien complet', ingr: '1 tortilla · 100g pois chiches · avocat · carotte · salade', steps: ['Écraser les pois chiches à la fourchette', 'Garnir la tortilla de légumes', 'Ajouter les pois chiches et rouler'] },
          { nom: 'Dîner', heure: '19h00', kcal: 600, prix: 1.85, icone: '🌙', bg: '#f0f0eb', plat: 'Poisson vapeur + légumes + riz', ingr: '150g poisson blanc · 200g légumes variés · 100g riz · citron', steps: ['Cuire le riz', 'Faire cuire le poisson à la vapeur 10 min', 'Servir avec légumes et citron'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '8h00', kcal: 400, prix: 1.50, icone: '🌅', bg: '#fff8e8', plat: 'French toast complet + fruits', ingr: '3 tranches pain complet · 1 oeuf · 100ml lait · cannelle · fruits', steps: ['Battre oeuf, lait et cannelle', 'Tremper le pain et cuire 2 min de chaque côté', 'Servir avec les fruits frais'] },
          { nom: 'Déjeuner', heure: '13h00', kcal: 590, prix: 2.20, icone: '☀️', bg: '#e8f7f1', plat: 'Taboulé libanais + poulet grillé', ingr: '150g semoule · 1/2 concombre · 2 tomates · persil · 120g poulet', steps: ['Hydrater la semoule 10 min', 'Couper les légumes finement', 'Griller le poulet 8 min et mélanger'] },
          { nom: 'Dîner', heure: '19h30', kcal: 580, prix: 1.90, icone: '🌙', bg: '#f0f0eb', plat: 'Velouté de brocolis + pain grillé', ingr: '400g brocolis · 1 oignon · 200ml lait · pain · fromage fondu', steps: ['Cuire brocolis et oignon 12 min', 'Mixer avec le lait', 'Servir avec pain grillé et fromage'] },
        ]
      },
      {
        repas: [
          { nom: 'Petit-déjeuner', heure: '9h00', kcal: 410, prix: 1.60, icone: '🌅', bg: '#fff8e8', plat: 'Chia pudding + mangue + coco', ingr: '40g graines de chia · 250ml lait de coco · 1/2 mangue · noix de coco', steps: ['La veille : mélanger chia et lait de coco', 'Laisser reposer au frigo', 'Le matin : garnir de mangue et coco râpée'] },
          { nom: 'Déjeuner', heure: '13h00', kcal: 570, prix: 2.10, icone: '☀️', bg: '#e8f7f1', plat: 'Salade niçoise légère', ingr: '2 oeufs · 1 boite thon · haricots verts · tomates · olives', steps: ['Cuire les oeufs durs 9 min', 'Cuire les haricots verts 5 min', 'Assembler et assaisonner à l\'huile olive'] },
          { nom: 'Dîner', heure: '19h00', kcal: 590, prix: 1.90, icone: '🌙', bg: '#f0f0eb', plat: 'Risotto aux champignons léger', ingr: '150g riz arborio · 200g champignons · 1 oignon · bouillon · parmesan', steps: ['Faire revenir champignons et oignon', 'Ajouter le riz et bouillon progressivement', 'Incorporer le parmesan en fin'] },
        ]
      },
    ],
    courses: [
      { nom: 'Yaourt grec (x6)', prix: 4.80 },
      { nom: 'Granola (500g)', prix: 3.50 },
      { nom: 'Fruits rouges surgelés (1kg)', prix: 4.80 },
      { nom: 'Lentilles (500g)', prix: 2.10 },
      { nom: 'Quinoa (500g)', prix: 3.90 },
      { nom: 'Pois chiches (x3)', prix: 3.90 },
      { nom: 'Oeufs (x12)', prix: 3.50 },
      { nom: 'Pain complet', prix: 2.80 },
      { nom: 'Flocons d\'avoine (1kg)', prix: 3.20 },
      { nom: 'Lait de coco (x2)', prix: 3.60 },
      { nom: 'Tofu ferme (400g)', prix: 3.20 },
      { nom: 'Bananes (1kg)', prix: 1.80 },
      { nom: 'Thon en boite (x3)', prix: 4.20 },
      { nom: 'Amandes (200g)', prix: 4.50 },
      { nom: 'Champignons (500g)', prix: 2.80 },
    ],
    vitamines: [
      { emoji: '🍊', nom: 'Vitamine B12', role: 'Combat la fatigue et soutient le système nerveux', aliments: ['Oeuf', 'Yaourt', 'Poisson'] },
      { emoji: '🥬', nom: 'Fer', role: 'Oxygène les cellules — essentiel contre la fatigue', aliments: ['Lentilles', 'Épinards', 'Quinoa'] },
      { emoji: '🍋', nom: 'Vitamine C', role: 'Booste l\'énergie et l\'absorption du fer', aliments: ['Kiwi', 'Poivron', 'Orange'] },
      { emoji: '🥜', nom: 'Oméga-3', role: 'Santé du cerveau et humeur stable', aliments: ['Noix', 'Sardines', 'Graines de lin'] },
    ]
  }
}

export default function Nutrition({ user, profile, onBack }) {
  const [mode, setMode] = useState('simple')
  const [jourActif, setJourActif] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)
  const [repasOuvert, setRepasOuvert] = useState(null)
  const [courses, setCourses] = useState(null)

  const objectif = profile?.objectif || 'poids'
  const plan = plans[objectif]
  const repasJour = plan.semaine[jourActif]?.repas || []

  const getCourses = () => courses || plan.courses.map(c => ({ ...c, fait: false }))
  const toggleCourse = (i) => {
    const updated = getCourses().map((c, idx) => idx === i ? { ...c, fait: !c.fait } : c)
    setCourses(updated)
  }

  const resteAcheter = getCourses().filter(c => !c.fait).reduce((sum, c) => sum + c.prix, 0)
  const totalSemaine = plan.courses.reduce((sum, c) => sum + c.prix, 0)
  const calJour = repasJour.reduce((sum, r) => sum + r.kcal, 0)
  const pct = Math.round((calJour / plan.calories) * 100)

  const objectifLabel = {
    poids: '🔥 Perte de poids',
    muscle: '💪 Musculation',
    energie: '⚡ Énergie'
  }

  return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>

      <div style={{background:'#1e2419',padding:'20px'}}>
        <button onClick={onBack} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'7px 14px',fontSize:'0.78rem',cursor:'pointer',marginBottom:'12px'}}>
          ← Tableau de bord
        </button>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:'1.2rem',fontWeight:'800',color:'white',marginBottom:'4px'}}>Nutrition</div>
            <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.5)'}}>{objectifLabel[objectif]}</div>
          </div>
          <div style={{display:'flex',gap:'6px'}}>
            <button onClick={() => setMode('simple')} style={{padding:'6px 12px',borderRadius:'99px',border:'none',background: mode === 'simple' ? '#d4e84a' : 'rgba(255,255,255,0.1)',color: mode === 'simple' ? '#111' : 'rgba(255,255,255,0.7)',fontSize:'0.75rem',fontWeight:'500',cursor:'pointer'}}>
              Simple
            </button>
            <button onClick={() => setMode('detail')} style={{padding:'6px 12px',borderRadius:'99px',border:'none',background: mode === 'detail' ? '#d4e84a' : 'rgba(255,255,255,0.1)',color: mode === 'detail' ? '#111' : 'rgba(255,255,255,0.7)',fontSize:'0.75rem',fontWeight:'500',cursor:'pointer'}}>
              Détaillé
            </button>
          </div>
        </div>
      </div>

      <div style={{background:'white',padding:'10px 12px',display:'flex',gap:'6px',overflowX:'auto',borderBottom:'1px solid #e8f7f1'}}>
        {jours.map((j, i) => (
          <button key={i} onClick={() => { setJourActif(i); setRepasOuvert(null) }}
            style={{padding:'6px 12px',borderRadius:'99px',border:'none',background: jourActif === i ? '#1a9e6e' : '#f0f0eb',color: jourActif === i ? 'white' : '#6b7a6a',fontSize:'0.78rem',fontWeight: jourActif === i ? '600' : '400',cursor:'pointer',flexShrink:0}}>
            {j}
          </button>
        ))}
      </div>

      <div style={{padding:'14px'}}>

        <div style={{background:'#1e2419',borderRadius:'14px',padding:'12px 14px',marginBottom:'12px'}}>
          <div style={{fontSize:'0.68rem',color:'#d4e84a',fontWeight:'600',marginBottom:'3px'}}>Conseil HomeStrong</div>
          <div style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.8)',lineHeight:'1.5',fontStyle:'italic'}}>"{plan.conseil}"</div>
        </div>

        {mode === 'detail' && (
          <div style={{background:'white',borderRadius:'14px',padding:'12px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
              <div style={{fontSize:'0.8rem',fontWeight:'500',color:'#111'}}>🍎 Calories du jour</div>
              <div style={{fontSize:'0.9rem',fontWeight:'700',color:'#1a9e6e'}}>{calJour} / {plan.calories} kcal</div>
            </div>
            <div style={{height:'6px',background:'#eee',borderRadius:'99px',overflow:'hidden'}}>
              <div style={{height:'100%',background:'#1a9e6e',borderRadius:'99px',width: Math.min(pct, 100) + '%'}}></div>
            </div>
          </div>
        )}

        <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'8px'}}>
          Plan du jour — {jours[jourActif]}
        </div>

        {repasJour.map((repas, i) => (
          <div key={i} style={{background:'white',borderRadius:'14px',overflow:'hidden',marginBottom:'8px',boxShadow:'0 2px 6px rgba(0,0,0,0.05)'}}>
            <div onClick={() => setRepasOuvert(repasOuvert === i ? null : i)}
              style={{padding:'11px 13px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',background: repas.bg}}>
              <div style={{display:'flex',alignItems:'center',gap:'9px'}}>
                <span style={{fontSize:'1rem'}}>{repas.icone}</span>
                <div>
                  <div style={{fontSize:'0.8rem',fontWeight:'500',color:'#111'}}>{repas.nom}</div>
                  <div style={{fontSize:'0.68rem',color:'#6b7a6a'}}>{repas.heure}</div>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#1a9e6e'}}>{repas.kcal} kcal</div>
                <div style={{fontSize:'0.65rem',color:'#6b7a6a'}}>${repas.prix.toFixed(2)}</div>
              </div>
            </div>
            <div style={{padding:'10px 13px',borderTop:'1px solid rgba(0,0,0,0.04)'}}>
              <div style={{fontSize:'0.85rem',fontWeight:'600',color:'#111',marginBottom:'3px'}}>{repas.plat}</div>
              <div style={{fontSize:'0.72rem',color:'#6b7a6a'}}>{repas.ingr}</div>
              {repasOuvert === i && mode === 'detail' && (
                <div style={{marginTop:'8px'}}>
                  <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#111',marginBottom:'5px'}}>Préparation</div>
                  {repas.steps.map((s, j) => (
                    <div key={j} style={{display:'flex',gap:'7px',marginBottom:'4px',alignItems:'flex-start'}}>
                      <div style={{width:'16px',height:'16px',borderRadius:'50%',background:'#1a9e6e',color:'white',fontSize:'0.6rem',fontWeight:'700',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{j+1}</div>
                      <div style={{fontSize:'0.74rem',color:'#6b7a6a',lineHeight:'1.4'}}>{s}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {mode === 'detail' && (
          <>
            <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'8px',marginTop:'4px'}}>
              Vertus & vitamines clés
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'12px'}}>
              {plan.vitamines.map((v, i) => (
                <div key={i} style={{background:'white',borderRadius:'12px',padding:'10px',boxShadow:'0 2px 6px rgba(0,0,0,0.05)'}}>
                  <div style={{fontSize:'1.2rem',marginBottom:'4px'}}>{v.emoji}</div>
                  <div style={{fontSize:'0.75rem',fontWeight:'700',color:'#111',marginBottom:'2px'}}>{v.nom}</div>
                  <div style={{fontSize:'0.65rem',color:'#6b7a6a',lineHeight:'1.4',marginBottom:'5px'}}>{v.role}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'3px'}}>
                    {v.aliments.map((a, j) => (
                      <span key={j} style={{fontSize:'0.6rem',background:'#e8f7f1',color:'#0d6b49',padding:'2px 6px',borderRadius:'99px'}}>{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'8px'}}>
          Liste de courses — semaine (~$45)
        </div>
        <div style={{background:'white',borderRadius:'14px',padding:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',marginBottom:'24px'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
            <div style={{fontSize:'0.8rem',fontWeight:'500',color:'#111'}}>🛒 Budget semaine</div>
            <div style={{fontSize:'0.85rem',fontWeight:'700',color:'#1a9e6e'}}>${totalSemaine.toFixed(2)}</div>
          </div>
          <div style={{background:'#e8f7f1',borderRadius:'8px',padding:'7px 10px',display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
            <div style={{fontSize:'0.72rem',color:'#0d6b49',fontWeight:'500'}}>🛒 Reste à acheter</div>
            <div style={{fontSize:'0.82rem',fontWeight:'700',color: resteAcheter === 0 ? '#0d6b49' : '#1a9e6e'}}>
              {resteAcheter === 0 ? '✓ Tout acheté !' : '$' + resteAcheter.toFixed(2)}
            </div>
          </div>
          {getCourses().map((c, i) => (
            <div key={i} onClick={() => toggleCourse(i)} style={{display:'flex',alignItems:'center',gap:'9px',padding:'7px 0',borderBottom: i < getCourses().length - 1 ? '0.5px solid #f0f0eb' : 'none',cursor:'pointer'}}>
              <div style={{width:'18px',height:'18px',borderRadius:'5px',background: c.fait ? '#1a9e6e' : 'white',border: c.fait ? 'none' : '1.5px solid #e8f7f1',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {c.fait && <span style={{color:'white',fontSize:'0.65rem'}}>✓</span>}
              </div>
              <div style={{flex:1,fontSize:'0.78rem',color: c.fait ? '#6b7a6a' : '#111',textDecoration: c.fait ? 'line-through' : 'none'}}>{c.nom}</div>
              <div style={{fontSize:'0.72rem',color:'#1a9e6e',fontWeight:'500'}}>${c.prix.toFixed(2)}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}