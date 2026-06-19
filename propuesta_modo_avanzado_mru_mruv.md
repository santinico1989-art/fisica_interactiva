# Propuesta de Diseño: Modo Avanzado para Carrera MRU y MRUV

Este documento contiene la estructura física, matemática y de diseño de interfaz acordada para la futura implementación de un **Modo Avanzado** con desafíos aleatorios en el simulador de carreras.

---

## 1. Concepto General
El Modo Avanzado seleccionará aleatoriamente un escenario físico entre tres tipos de desafíos cinemáticos. Manteniendo la mecánica del modo básico, el simulador elegirá al azar cuál de las variables involucradas será la incógnita (marcada con `?` y borde naranja) que el estudiante debe calcular para resolver la carrera.

---

## 2. Tipos de Desafíos Avanzados

### A. Modo Ventaja (Handicap)
*   **Descripción:** El Auto A (MRU) inicia la carrera con una posición adelantada de ventaja ($x_{0a}$), o bien el Auto B (MRUV) inicia con ventaja ($x_{0b}$). El desafío se basa en una carrera competitiva donde ambos empatan en la línea de meta ($d$) cruzándola en el mismo instante ($t$).
*   **Ecuaciones de Empate:**
    *   Si A tiene ventaja:
        $$d = x_{0a} + v_a \cdot t$$
        $$d = \frac{1}{2} a_b \cdot t^2$$
    *   Si B tiene ventaja:
        $$d = v_a \cdot t$$
        $$d = x_{0b} + v_{0b} \cdot t + \frac{1}{2} a_b \cdot t^2$$
        *(Requiere validar la condición de cruce: $(v_a - v_{0b})^2 \ge 2 \cdot a_b \cdot x_{0b}$)*
*   **Variables elegibles como incógnita:**
    *   Tiempo total ($t$)
    *   Distancia de la meta ($d$)
    *   Ventaja inicial ($x_{0a}$ o $x_{0b}$)
    *   Velocidad constante de A ($v_a$)
    *   Aceleración de B ($a_b$)

### B. Modo Desfase (Tiempo de Reacción)
*   **Descripción:** Ambos vehículos parten del origen ($x=0$), pero uno de ellos inicia con un retraso temporal de reacción ($\Delta t$) con respecto al otro. El objetivo es calcular los parámetros necesarios para que ambos crucen la meta ($d$) en el mismo instante ($t$).
*   **Ecuaciones de Empate (si B sale retrasado):**
    $$d = v_a \cdot t$$
    $$d = \frac{1}{2} a_b \cdot (t - \Delta t)^2$$
*   **Variables elegibles como incógnita:**
    *   Tiempo de desfase ($\Delta t$)
    *   Tiempo total de carrera ($t$)
    *   Distancia de la meta ($d$)
    *   Velocidad de A ($v_a$)
    *   Aceleración de B ($a_b$)

### C. Modo Encuentro (Cruce Frontal)
*   **Descripción:** Los autos parten desde extremos opuestos de la pista a una distancia total de separación ($L$). El Auto A (MRU) va hacia la derecha y el Auto B (MRUV) va hacia la izquierda. El desafío consiste en calcular el punto exacto ($x_e$) o instante ($t$) donde se cruzan en la pista.
*   **Ecuaciones de Encuentro:**
    $$x_e = v_a \cdot t$$
    $$L - x_e = \frac{1}{2} a_b \cdot t^2$$
*   **Variables elegibles como incógnita:**
    *   Punto de encuentro ($x_e$)
    *   Distancia de separación inicial ($L$)
    *   Tiempo transcurrido hasta el cruce ($t$)
    *   Velocidad de A ($v_a$)
    *   Aceleración de B ($a_b$)

---

## 3. Adaptaciones Requeridas en la Interfaz (UI/UX)
1.  **HUD de Variables:** Mostrar de manera dinámica los nuevos campos según el modo (ej. "Ventaja de A", "Retraso de B", "Separación inicial") en lugar de las variables estáticas actuales.
2.  **Animación en Canvas:** 
    *   En *Encuentro*, invertir el gráfico del coche A para que apunte a la izquierda y reubicar la meta como una zona de colisión.
    *   En *Ventaja*, colocar el coche correspondiente ya adelantado sobre la pista antes de presionar iniciar.
    *   En *Desfase*, congelar el coche retrasado y mostrar una cuenta regresiva visual flotante encima.
3.  **Botonera:** El botón "Siguiente Ejercicio" cambiará de forma aleatoria tanto el **Tipo de Desafío** como la **Incógnita** del sistema.
