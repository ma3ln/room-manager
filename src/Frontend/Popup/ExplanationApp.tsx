import Box from "@mui/material/Box";
import {HelpOutline} from "@mui/icons-material";
import React from "react";
import "../CSS/Popup/ExplanationApp.css"

function ExplanationApp() {
    return (
        <Box className="popoverExplanationApp">
            <HelpOutline sx={{ fontSize: '400%', color: '#365D73' }}/>
            <p className="explanationText">Diese App soll die Funktion einer Raumbuchung Software beinhalten.</p>
            <p className="explanationText">Auf dem Dashboard werden persönliche Daten angezeigt. Weiterhin sieht man dort auch eine Liste der Buchungen der eingeloggten Person</p>
            <p className="explanationText">Die nächste Seite ist für das reservieren des Raumes zuständig, hier kann man dier Räume auch filtern nach eigenen angaben.</p>
            <p className="explanationText">Um neue Räume zu erschaffen kann man auf den 3. Tab gehen. Hier müssen alle Kriterien ausgefüllt werden und dann wird ein neuer Raum erstellt</p>
            <p className="explanationText">In der letzten Seite können die Räume nach den zugehörigen Kursen und Modulen gefilert werden</p>
        </Box>
    );
}

export default ExplanationApp